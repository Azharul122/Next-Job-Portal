import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

  

    const value = await req.json();

    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    const profile = await db.userProfile.findUnique({
      where: {
        userId,
      },
    });

    let userProfile;

    if (profile) {
      userProfile = await db.userProfile.update({
        where: {
          userId,
        },
        data: {
            
          ...value,
        },
      });
    } else {
      userProfile = await db.userProfile.create({
        data: {
            userId,
          ...value,
        },
      });
    }

    return NextResponse.json(userProfile, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
