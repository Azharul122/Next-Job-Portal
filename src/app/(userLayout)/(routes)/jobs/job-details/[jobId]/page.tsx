

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import JobDetailsContnts from './_components/JobDetailsContnts'
import { getJobs } from '@/actions/getJobs'
import { Separator } from '@/components/ui/separator'
import JobCard from '../../../search/_components/JobCard'

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {


    const session = await auth()
    const userId = session?.user.id 


    const job = await db.job.findUnique({
        where: {
            id: params.jobId
        },
        include: {
            attachments: true,
            company: true
        }
    })

    if (!job) {
        redirect("./")
    }

    const userProfile = await db.userProfile.findUnique({
        where: {
            userId
        },
        include: {
            resumes: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    const jobs = await getJobs({});
    let filterJobs = jobs.filter((j) => job?.id !== j.id && job?.categoryId === j.categoryId);





    return (
        <div>
            <JobDetailsContnts job={job} userProfile={userProfile} jobId={job.id} />

            <Separator />

            {
                filterJobs && filterJobs.length > 0 && (
                    <div className='py-5'>
                        <p className='text-lg mb-3'>Related Jobs</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 justify-center">

                            {filterJobs.map((job) => (
                                <JobCard key={job.id} job={job} userId={userId ? userId : null} />
                            ))}

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default JobDetailsPage