import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { jobId } = params;

    const value = await req.json();

    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }
    if (!jobId) {
      return new NextResponse("Jobid required", { status: 400 });
    }

    const job = await db.job.update({
      where: {
        id: jobId,
        userId,
      },
      data: { ...value },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
