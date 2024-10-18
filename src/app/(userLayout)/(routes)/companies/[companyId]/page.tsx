import { auth } from '@/auth'
import BreadCrumb from '@/components/ui/custom-breadceumb'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import CompanyDetailsContent from './_components/CompanyDetailsContent'
import { Job } from '@prisma/client'

const CompanyDetails = async ({ params }: { params: { companyId: string } }) => {
    const companyId = params.companyId
    const session = await auth()
    const userId = session?.user.id



    const company = await db.company.findUnique({
        where: {
            id: companyId
        }
    })

    if (!userId || !companyId) {
        redirect("/companies")
    }

    let jobs: Job[] = []


    try {

        jobs = await db.job.findMany({
            where: {
                companyId: companyId
            },
            include: {
                company: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })

    } catch (error) {
        console.log(error)
    }


    return (
        <div>
            <BreadCrumb breadcrumbItems={[{ link: "/companies", label: "All company" }]} breaderCrumbPage={`${company?.companyTitle !== undefined ? company.companyTitle : ""}`} />

            {/* Comapny image */}

            <div className="my-3 z-10 relative">
                {company?.coverImage && (<img src={company.coverImage} className="w-full h-[250px] z-10" alt="" />)}
            </div>

            <CompanyDetailsContent userId={userId} company={company} job={jobs} />
        </div>
    )
}

export default CompanyDetails