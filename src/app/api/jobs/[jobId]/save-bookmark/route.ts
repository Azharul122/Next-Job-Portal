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

    // Update the savedUser field to include the userId
    const updatedJob = await db.job.update({
      where: {
        id: job.id,
      },
      data: {
        savedUser: {
          // Assuming savedUser is an array
          push: userId, // Adjust this based on your ORM's method for updating arrays
        },
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error occurred during PATCH:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
