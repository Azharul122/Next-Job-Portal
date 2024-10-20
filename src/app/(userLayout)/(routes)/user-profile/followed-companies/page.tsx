import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Company } from "@prisma/client"
import Image from "next/image"
import FeaturedCompanyCard from "../../_components/FeaturedCompanyCard"


const FollowedCompanyPage = async () => {

    const session = await auth()
    const userId = session?.user.id

    let followyedCompanies:Company[]=[]

    try {
        followyedCompanies = await db.company.findMany({
            where: {
                followers: {
                    has: userId
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        })
    } catch (error) {
        console.log(error)
    }
    return (
        <div className="py-10">
            <h3 className="text-xl pb-5">Your are following</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2">
                {
                    followyedCompanies && followyedCompanies.length > 0 ? followyedCompanies.map(fc => (
                        <div key={fc.id} className="flex items-center gap-2">
                            {/* {
                                fc.logo && <Image src={fc.logo} height={40} width={40} alt="" />
                            }
                            <h4>{fc.companyTitle}</h4> */}
                            <FeaturedCompanyCard company={fc}/>
                        </div>
                    )) : "No company found"
                }
            </div>
        </div>
    )
}

export default FollowedCompanyPage