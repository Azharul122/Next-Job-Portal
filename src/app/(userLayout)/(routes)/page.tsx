import { auth } from "@/auth"
import Banner from "./_components/Banner"
import Hero from "./_components/Hero"
import Jobs from "./_components/Jobs"
import Categories from "./_components/Categories"
import { db } from "@/lib/db"
import FeaturedCompanies from "./_components/FeaturedCompanies"
import RecentlyHired from "./_components/RecentlyHired"
import { Category, Job } from "@prisma/client"


const HomePage = async () => {
  const session = await auth()
  const userId = session?.user.id

  let jobs:Job[] = [];
  let categoriesData:Category[] = [];

  try {
    jobs = await db.job.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: "asc"
      },
      include: {
        company: true
      },
      take: 8
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    // Optionally, you can set a fallback value or handle the error appropriately
  }

  try {
    categoriesData = await db.category.findMany({
      orderBy: {
        createdAt: "asc"
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Optionally, you can set a fallback value or handle the error appropriately
  }


  return (
    <div  className="min-h-[100vh-25rem]">
      <Banner />
      <Hero />
      <RecentlyHired/>
      <Jobs jobsData={jobs} userId={userId ? userId : ""} />
      <Categories categoriesData={categoriesData} />
      <FeaturedCompanies />
     

    </div>
  )
}

export default HomePage