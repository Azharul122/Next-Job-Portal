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

    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }
    if (!companyId) {
      return new NextResponse("companyId required", { status: 400 });
    }

    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 400 });
    }

    const followerIndexId = company.followers.indexOf(userId);
    let updatedCompany;
    if (followerIndexId !== -1) {
      updatedCompany = await db.company.update({
        where: {
          id: companyId,
          userId,
        },
        data: {
          followers: {
            set: company.followers.filter((follower) => follower !== userId),
          },
        },
      });
    }
   

    return NextResponse.json(JSON.stringify(updatedCompany), { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
