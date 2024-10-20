import { getJobs } from '@/actions/getJobs';
import { auth } from '@/auth'
import BreadCrumb from '@/components/ui/custom-breadceumb'
import { redirect } from 'next/navigation';
import React from 'react'
import JobCard from '../../search/_components/JobCard';

interface propsTypes {
    searchParams: {
        title?: string;
        workMode?: string;
        shiftTimimg?: string;
        yearsOfExperience?: string;
        categoryId?: string;
        createdAtFilter?: string;
    }
}

const SavedJobsPage = async ({ searchParams }: propsTypes) => {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) {
        redirect("/sign-in")
    }

    const jobs = await getJobs({ ...searchParams, savedJobs: true })

    console.log(jobs)

    return (
        <div className='pb-5'>

            <BreadCrumb breaderCrumbPage='Saved jobs' breadcrumbItems={[{ link: "/jobs", label: "jobs" }]} />

            {/*  */}

            {
                jobs && jobs.length > 0 && (
                    <div className='py-5 w-full'>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 justify-center w-full">

                            {jobs.map((j) => (
                                <JobCard key={j.id} job={j} userId={userId ? userId : null} />
                            ))}

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SavedJobsPage