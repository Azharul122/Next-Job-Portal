import { db } from "@/lib/db";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { storge } from "../../../../../../../config/firebase.config";
import { auth } from "@/auth";

export const DELETE = async (
  req: Request,
  { params }: { params: { resumeId: string } }
) => {
  try {
    const session=await auth()
    const userId=session?.user?.id
    const { resumeId } = params;

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    const resume = await db.resumes.findUnique({
      where: {
        id: resumeId,
      },
    });

    if (!resume || resume.id !== resumeId) {
      return new NextResponse("resume not found", { status: 404 });
    }

    // delete from the firebase storage
    const storageRef = ref(storge, resume.url);
    await deleteObject(storageRef);

    // delete from mongodb
    await db.resumes.delete({
      where: {
        id: resumeId,
      },
    });

    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.log(`[RESUME_DELETE] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};