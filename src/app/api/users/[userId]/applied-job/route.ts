import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const jobId = await req.text();
    const profile = await db.userProfile.findUnique({
      where: {
        userId: userId as string,
      },
    });

    console.log(profile,jobId,userId)
    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }
    if (!jobId) {
      return new NextResponse("Job ID missing", { status: 401 });
    }
    if (!profile) {
      return new NextResponse("Profile missing", { status: 401 });
    }

    let userProfile;

    userProfile = await db.userProfile.update({
      where: {
        userId,
      },
      data: {
        appliedJobs: {
          push: { jobId },
        },
      },
    });

    return NextResponse.json(userProfile, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
