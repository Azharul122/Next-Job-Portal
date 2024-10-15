import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Job } from "@prisma/client";
// import { toast } from "sonner";

type GetJobs = {
  title?: string;
  workMode?: string | string[];
  shiftTimimg?: string | string[];
  yearsOfExperience?: string;
  categoryId?: string;
  createdAtFilter?: string;
  savedJobs?: boolean;
};

//   title,
//   workMode,
//   shiftTimimg,
//   yearsOfExperience,
//   categoryId,
//   createdAtFilter,
//   savedJobs,
// }: GetJobs): Promise<Job[]> => {
//   const session = await auth();
//   const userId = session?.user.id;

//   try {
//     const query: any = {
//       where: {
//         isPublished: true,
//         // You can add filtering based on the provided parameters here
//       },
//       include: {
//         company: true,
//         category: true,
//         attachments: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     };

//     if (typeof title !== "undefined" && typeof categoryId !== "undefined") {
//       query.where = {
//         AND: [
//           typeof title !== "undefined" && {
//             title: {
//               contains: title,
//               mode: "insensitive",
//             },
//           },
//           typeof categoryId !== "undefined" && {
//             categoryId: {
//               equals: categoryId,
//             },
//           },
//         ].filter(Boolean),
//       };
//     }

//     const jobs = await db.job.findMany(query);
//     // console.log(jobs)
//     return jobs;
//   } catch (error) {
//     toast.error("Problem with getting jobs");
//     console.log(error);
//     return []; // return an empty array on error
//   }
// };

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
        ...(title && {
          title: {
            contains: title,
            mode: "insensitive",
          },
        }),
        ...(categoryId && {
          categoryId: {
            equals: categoryId,
          },
        }),
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

    // createdAt filterj
    if (createdAtFilter) {
      let currentdate = new Date();
      let startDate;

      switch (createdAtFilter) {
        case "today":
          startDate = new Date(currentdate.setHours(0, 0, 0, 0)); // Start of today
          break;
        case "yesterday":
          startDate = new Date(currentdate.setDate(currentdate.getDate() - 1));
          startDate.setHours(0, 0, 0, 0); // Start of yesterday
          break;
        case "thisWeek":
          startDate = new Date(currentdate);
          startDate.setDate(currentdate.getDate() - currentdate.getDay()); // Start of the week (Sunday)
          startDate.setHours(0, 0, 0, 0); // Reset time to start of the day
          break;
        case "lastWeek":
          startDate = new Date(currentdate);
          startDate.setDate(currentdate.getDate() - currentdate.getDay() - 7); // Start of last week
          startDate.setHours(0, 0, 0, 0);
          break;
        case "thisMonth":
          startDate = new Date(
            currentdate.getFullYear(),
            currentdate.getMonth(),
            1
          );
          break;
        case "thisYear":
          startDate = new Date(currentdate.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(0);
      }

      query.where.createdAt = {
        gte: startDate,
      };
    }

    // console.log("shift",shiftTimimg)

    // const formatedSiftTiming = shiftTimimg?.split(",");

    // console.log("format",formatedSiftTiming)

    // if (formatedSiftTiming && formatedSiftTiming.length > 0) {
    //   query.where.shiftTimimg = {
    //     in: formatedSiftTiming,
    //   };
    // }

    // Assume shiftTimimg can be string, string array, or undefined/null

    // Ensure shiftTimimg is a string or an array before calling split or map
    let formatedSiftTiming: string[] = [];

    if (typeof shiftTimimg === "string") {
      formatedSiftTiming = shiftTimimg
        .split(",")
        .map((item: string) => item.trim());
    } else if (Array.isArray(shiftTimimg)) {
      formatedSiftTiming = shiftTimimg.map((item: string) => item.trim());
    }

    if (formatedSiftTiming.length > 0) {
      query.where.shiftTimimg = {
        in: formatedSiftTiming,
      };
    }

    // Saved jobs

    if (savedJobs) {
      query.where.savedUser = {
        has: userId,
      };
    }

    // Handle workMode
    let formatedWorkMode: string[] = [];

    if (typeof workMode === "string") {
      formatedWorkMode = workMode.split(",").map((item: string) => item.trim());
    } else if (Array.isArray(workMode)) {
      formatedWorkMode = workMode.map((item: string) => item.trim());
    }

    if (formatedWorkMode.length > 0) {
      query.where.workMode = {
        in: formatedWorkMode,
      };
    }

    const jobs = await db.job.findMany(query);
    return jobs;
  } catch (error) {
    // toast.error("Problem with getting jobs");
    console.log(error);
    return []; // return an empty array on error
  }
};
