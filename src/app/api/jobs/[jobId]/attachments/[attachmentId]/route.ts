
import { auth } from "@/auth";
import { db } from "@/lib/db";

import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { storge } from "../../../../../../../config/firebase.config";

export const DELETE = async (
  req: Request,
  { params }: { params: { jobId: string; attachmentId: string } }
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { jobId, attachmentId } = params;

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("ID Is missing", { status: 401 });
    }

    const attachment = await db.attachment.findUnique({
      where: {
        id: attachmentId,
      },
    });

    if (!attachment || attachment.jobId !== params.jobId) {
      return new NextResponse("Attachment not found", { status: 404 });
    }

    // delete from the firebase storage
    const storageRef = ref(storge, attachment.url);
    await deleteObject(storageRef);

    // delete from mongodb
    await db.attachment.delete({
      where: {
        id: attachmentId,
      },
    });

    return NextResponse.json({ message: "Attachment deleted successfully" });
  } catch (error) {
    console.log(`[JOB_DELETE] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};