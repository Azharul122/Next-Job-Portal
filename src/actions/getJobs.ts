import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Job } from "@prisma/client";
import { toast } from "sonner";

type GetJobs = {
  title?: string;
  workMode?: string;
  shiftTimimg?: string;
  yearsOfExperience?: string;
  categoryId?: string;
  createdAtFilter?: string;
  savedJobs?: boolean;
};

export const getJobs = async ({
  title,
  workMode,
  shiftTimimg,
  yearsOfExperience,
  categoryId,
  createdAtFilter,
  savedJobs,
}: GetJobs): Promise<Job[]> => {
  const session = await auth();
  const userId = session?.user.id;

  try {
    const query: any = {
      where: {
        isPublished: true,
        // You can add filtering based on the provided parameters here
      },
      include: {
        company: true,
        category: true,
        attachments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    const jobs = await db.job.findMany(query);
    // console.log(jobs)
    return jobs;

  } catch (error) {
    toast.error("Problem with getting jobs");
    console.log(error);
    return []; // return an empty array on error
  }
};
