import { auth } from "@/auth";
import { db } from "@/lib/db";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { storge } from "../../../../../config/firebase.config";
import { Attachment } from "@prisma/client";

export const PATCH = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { jobId } = params;

    const value = await req.json();

    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }
    if (!jobId) {
      return new NextResponse("Jobid required", { status: 400 });
    }

    const job = await db.job.update({
      where: {
        id: jobId,
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

export const DELETE = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { jobId } = params;

    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }
    if (!jobId) {
      return new NextResponse("Jobid required", { status: 400 });
    }

    const job = await db.job.findUnique({
      where: {
        id: jobId,
        userId,
      },
      include: {
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }
    if (job.img) {
      const storageRef = ref(storge, job.img);
      await deleteObject(storageRef);
    }

    if (Array.isArray(job.attachments) && job.attachments.length > 0) {
      await Promise.all(
        job.attachments.map(async (attacment: Attachment) => {
          const attachmentStorageRef = ref(storge, attacment.url);
          await deleteObject(attachmentStorageRef);
        })
      );
    }

    const deleteJOb = await db.job.delete({
      where: {
        id: jobId,
        userId,
      },
    });

    return NextResponse.json(deleteJOb, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
