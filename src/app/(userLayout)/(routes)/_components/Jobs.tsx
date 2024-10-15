import { Job } from '@prisma/client'
import React from 'react'
import JobCard from '../search/_components/JobCard'

interface propsType {
    jobsData: Job[]
    userId: string
}

const Jobs = ({ jobsData, userId }: propsType) => {
    return (
        <div className='py-5'>
            <p className='text-lg mb-3'>Related Jobs</p>
            {
                jobsData && jobsData.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 justify-center">

                        {jobsData.map((job) => (
                            <JobCard key={job.id} job={job} userId={userId ? userId : null} />
                        ))}

                    </div>

                )
            }
        </div>
    )
}

export default Jobs