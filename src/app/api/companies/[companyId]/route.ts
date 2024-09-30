import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { companyId: string } }
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { companyId } = params;

    const value = await req.json();

    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }
    if (!companyId) {
      return new NextResponse("Jobid required", { status: 400 });
    }

    const job = await db.company.update({
      where: {
        id: companyId,
        userId,
      },
      data: { ...value },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
