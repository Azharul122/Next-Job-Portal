import { auth } from "@/auth"
import Banner from "./_components/Banner"
import Hero from "./_components/Hero"
import Jobs from "./_components/Jobs"
import Categories from "./_components/Categories"
import { db } from "@/lib/db"
import FeaturedCompanies from "./_components/FeaturedCompanies"


const HomePage = async () => {
  const session = await auth()
  const userId = session?.user.id

  let jobs = await db.job.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: "asc"
    },
    take: 8
  });


  let categoriesData = await db.category.findMany({

    orderBy: {
      createdAt: "asc"
    },

  })


  return (
    <div style={{ minHeight: 'calc(100vh - 10rem)' }} className="min-h-[100vh-25rem]">
      <Banner />
      <Hero />
      <Jobs jobsData={jobs} userId={userId ? userId : ""} />
      <Categories categoriesData={categoriesData} />
      <FeaturedCompanies />

    </div>
  )
}

export default HomePage