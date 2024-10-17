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
    if (!jobId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("id missing", { status: 404 });
    }

    const job = await db.job.findUnique({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 402 });
    }

    const publishJob = await db.job.update({
      where: {
        id: jobId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(publishJob);
  } catch (error) {
    console.log(`job publish patch , ${error}`);
    return new NextResponse("Internal error");
  }
};
