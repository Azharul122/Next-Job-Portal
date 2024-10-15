import { auth } from '@/auth'
import BreadCrumb from '@/components/ui/custom-breadceumb'
import { DataTable } from '@/components/ui/data-table'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { JobApplicantsColumn } from './JobApplicantsColumn'

const NumberOfApplicants = async ({ params }: { params: { jobId: string } }) => {

    const session = await auth()
    const userId = session?.user.id
    const jobId = params.jobId

    if (!jobId || !userId) {
        redirect("/")
    }

    const job = await db.job.findUnique({
        where: {
            userId: userId as string,
            id: jobId
        }
    })


    const userProfiles = await db.userProfile.findMany({

        include: {
            resumes: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    const jobs = await db.job.findMany({
        where: {
            userId: userId as string,
            id: jobId
        },
        include: {
            company: true,
            category: true
        },
        orderBy: {
            createdAt: "asc"
        }
    })



    const filterProfile = userProfiles && userProfiles.filter(profile => profile.appliedJobs.some(aj => aj.jobId === jobId))

    const formatDate = (dateStr: Date | undefined) => {
        const date = new Date(dateStr ? dateStr : "");
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const formattedProfiles = filterProfile.map(fp => ({
        id: fp.userId,
        fullName: fp.fullName ? fp.fullName : "",
        email: fp.email ? fp.email : "",
        contact: fp.contact ? fp.contact : "",
        appliedAt: formatDate(fp.appliedJobs.find(job => job.jobId === jobId)?.appliedAt),
        resume: fp.resumes.find(res => res.id === fp.ActiveResumeId)?.url ?? "",
        name: fp.resumes.find(res => res.id === fp.ActiveResumeId)?.name ?? ""

    }))



    return (
        <div className='flex flex-col gap-4 justify-center'>
            <div className="">
                <BreadCrumb breaderCrumbPage='applicant' breadcrumbItems={[{ label: "jobs", link: "/jobs" }, { link: "/jobs", label: `${job ? job.title : ""}` }]} />
            </div>

            {/*  */}
            <DataTable searchKey='fullName' columns={JobApplicantsColumn} data={formattedProfiles} />
        </div>
    )
}

export default NumberOfApplicants