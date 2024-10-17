
import { auth } from "@/auth";
import { db } from "@/lib/db";

import { Resumes } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const session=await auth()
    const userId=session?.user.id

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    const { resumes } = await req.json();

    if (!resumes || !Array.isArray(resumes) || resumes.length === 0) {
      return new NextResponse("Invalid Resume Format", { status: 400 });
    }

    const createdResumes: Resumes[] = [];

    for (const resume of resumes) {
      const { url, name } = resume;


      const existingresume = await db.resumes.findFirst({
        where: {
          profileId: userId,
          url,
        },
      });

      if (existingresume) {
       
        console.log(
          `Resume with URL ${url} already exists for resumeId ${userId}`
        );
        continue;
      }

      // create a new resume

      const createdResume = await db.resumes.create({
        data: {
          url,
          name,
          profileId: userId,
        },
      });

      createdResumes.push(createdResume);
    }

    return NextResponse.json(createdResumes);
  } catch (error) {
    console.log(`[USER_RESUME_POST] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
