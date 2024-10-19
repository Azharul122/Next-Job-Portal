import { db } from "@/lib/db";

export const getTotalJobsLength = async () => {
  try {
    const totalJobs = await db.job.findMany({
      where: {
        isPublished: true,
      },
    });
    return totalJobs.length;
  } catch (error) {
    console.log(error);
  }
};

export const getRecruiterTotalJobsLength = async (userId: string | null) => {
  try {
    if (!userId) return 0;
    const totalJobs = await db.job.findMany({
      where: {
        isPublished: true,
        userId,
      },
    });
    return totalJobs.length;
  } catch (error) {
    console.log(error);
  }
};
export const getTotalCompanyLength = async () => {
  try {
    const totalCompany = await db.company.findMany({});
    return totalCompany.length;
  } catch (error) {
    console.log(error);
  }
};

export const getRecruiterTotalCompanyLength = async (userId: string | null) => {
  try {
    if (!userId) return 0;
    const totalRecruiterCompany = await db.company.findMany({
      where: {
        userId,
      },
    });
    return totalRecruiterCompany.length;
  } catch (error) {
    console.log(error);
  }
};

interface pichartMonthlyChart {
  name: string;
  value: number;
}

export const getMonthWiseJobChart = async (
  userId: string | null
): Promise<pichartMonthlyChart[]> => {
  if (!userId) {
    return [];
  }
  const jobs = await db.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const currentYear = new Date().getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyCount: pichartMonthlyChart[] = months.map((month, index) => ({
    name: month,
    value: 0,
  }));

  const monthlyCountLockup: { [key: string]: pichartMonthlyChart } =
    monthlyCount.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {} as { [key: string]: pichartMonthlyChart });

  jobs.forEach((job) => {
    const createdAt = new Date(job.createdAt);
    const month = createdAt.toLocaleString("default", { month: "short" });
    const year = createdAt.getFullYear();

    if (year === currentYear) {
      if (monthlyCountLockup[month]) {
        monthlyCountLockup[month].value++;
      }
    }
  });

  return monthlyCount;
};

export const getMonthWiseCompanyChart = async (
  userId: string | null
): Promise<pichartMonthlyChart[]> => {
  if (!userId) {
    return [];
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //   console.log(companies)

  const currentYear = new Date().getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyCount: pichartMonthlyChart[] = months.map((month, index) => ({
    name: month,
    value: 0,
  }));

  //   console.log(monthlyCount)

  const monthlyCountLockup: { [key: string]: pichartMonthlyChart } =
    monthlyCount.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {} as { [key: string]: pichartMonthlyChart });

  // console.log(monthlyCountLockup)

  companies.forEach((company) => {
    const createdAt = new Date(company.createdAt);
    const month = createdAt.toLocaleString("default", { month: "short" }); // Convert to lowercase
    const year = createdAt.getFullYear();

    // console.log(yeaFr,currentYear,monthlyCountLockup[month],month)

    if (year === currentYear) {
      if (monthlyCountLockup[month]) {
        monthlyCountLockup[month].value++;
      }
    }
  });

  return monthlyCount;
};
