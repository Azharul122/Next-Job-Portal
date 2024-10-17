import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
      const session = await auth();
      const userId = session?.user?.id;

      const value = await req.json();

      if (!userId) {
          return new NextResponse("Not authenticated", { status: 401 });
      }
      if (!value.title) {
          return new NextResponse("Title required", { status: 400 });
      }

      

      const job = await db.job.create({
          data: {
              userId,
              title: value.title,
              Description: value.Description,
              sort_description: value.sort_description,
              img: value.img,
              isPublished: value.isPublished,
              tags: value.tags,
              savedUser: value.savedUser,
              shiftTimimg: value.shiftTimimg,
              hourlyRate: value.hourlyRate,
              yearsOfExperience: value.yearsOfExperience,
              workMode: value.workMode,
              deadline: value.deadline,
          },
      });

      return NextResponse.json(job, { status: 201 });
  } catch (error) {
      console.error("Error creating job:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
};
