import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const { jobId } = params;
    if (!jobId) {
      return new NextResponse("Job not found", { status: 404 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const job = await db.job.findUnique({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    const updatedJob = await db.job.update({
      where: {
        id: job.id,
      },
      data: {
        savedUser: {
          push: userId,
        },
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error occurred during PATCH:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
