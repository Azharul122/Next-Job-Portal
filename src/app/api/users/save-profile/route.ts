import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
   

    const value = await req.json();
    const userProfile = await db.userProfile.create({
      data: {
        userId: value.userId,
        fullName: value.fullName,
        email: value.email,
      },
    });

    return NextResponse.json(userProfile, { status: 201 });
  } catch (error) {
    console.error("Error saving user profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
