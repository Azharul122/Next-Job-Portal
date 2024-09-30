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
      if (!value.companyTitle) {
          return new NextResponse("Title required", { status: 400 });
      }

      const job = await db.company.create({
          data: {
              userId,
              companyTitle: value.companyTitle
          },
      });

      return NextResponse.json(job, { status: 201 });
  } catch (error) {
      console.error("Error creating job:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
};
