import { auth } from "@/auth"
import { db } from "@/lib/db"
import Image from "next/image"


const FollowedCompanyPage = async () => {

    const session = await auth()
    const userId = session?.user.id

    const followyedCompanies = await db.company.findMany({
        where: {
            followers: {
                has: userId
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    })
    return (
        <div>
            <h3 className="text-xl pb-5">Your are following</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2">
                {
                    followyedCompanies && followyedCompanies.length > 0 ? followyedCompanies.map(fc => (
                        <div key={fc.id} className="flex items-center gap-2">
                            {
                                fc.logo && <Image src={fc.logo} height={40} width={40} alt="" />
                            }
                            <h4>{fc.companyTitle}</h4>
                        </div>
                    )) : "No company found"
                }
            </div>
        </div>
    )
}

export default FollowedCompanyPage