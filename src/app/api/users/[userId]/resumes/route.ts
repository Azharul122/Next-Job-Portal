// import { auth } from "@/auth";
// import { db } from "@/lib/db";
// // import { auth } from "@clerk/nextjs/server";
// import {  Resumes } from "@prisma/client";
// import { NextResponse } from "next/server";

// export const POST = async (
//   req: Request,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const session = await auth();
//     const userId = session?.user?.id;
//     const { id } = params;

//     if (!userId) {
//       return new NextResponse("Un-Authorized", { status: 401 });
//     }

//     if (!id) {
//       return new NextResponse("ID Is missing", { status: 401 });
//     }

//     const { resumes } = await req.json();

//     if (
//       !resumes ||
//       !Array.isArray(resumes) ||
//       resumes.length === 0
//     ) {
//       return new NextResponse("Invalid resume Format", { status: 400 });
//     }

//     const createdresumes: Resumes[] = [];

//     for (const resume of resumes) {
//       const { url, name } = resume;

//       //   check the resume with the same url is already exists for this id

//       const existingresume = await db.resumes.findFirst({
//         where: {
//           id,
//           url,
//         },
//       });

//       if (existingresume) {
//         // skip the insertion
//         console.log(
//           `resume with URL ${url} already exists for id ${id}`
//         );
//         continue;
//       }

//       // create a new resume

//       const createdresume = await db.resumes.create({
//         data: {
//           url,
//           name,
//           profileId:userId,
//         },
//       });

//       createdresumes.push(createdresume);
//     }

//     return NextResponse.json(createdresumes);
//   } catch (error) {
//     console.log(`[JOB_resume_POST] : ${error}`);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };



import { auth } from "@/auth";
import { db } from "@/lib/db";

import { Attachment, Resumes } from "@prisma/client";
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

      //   check the resume with the same url is already exists for this resumeId

      const existingresume = await db.resumes.findFirst({
        where: {
          profileId: userId,
          url,
        },
      });

      if (existingresume) {
        // skip the insertion
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
