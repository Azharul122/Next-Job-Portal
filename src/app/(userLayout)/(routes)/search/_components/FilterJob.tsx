"use client"

import { Job } from '@prisma/client'
import { AnimatePresence, motion } from "framer-motion"
import React from 'react'
import JobCard from './JobCard'
import { fadeInOut } from '../../../../../../animations/intex'

interface fJobsProps {
    userId: string | null,
    jobs: Job[]
}

const FilterJob = ({ userId, jobs }: fJobsProps) => {

    

    if (jobs.length === 0) {
        return (
            <div className="w-full h-[70vh] flex justify-center items-center">
                <p className='text-5xl animate-pulse gradient-text'>Job Not Found</p>
            </div>
        )
    }
    return (
        <div className="">
            <AnimatePresence>
                <motion.div {...fadeInOut} layout className='py-2 space-y-3 flex flex-col'>
                    {
                        jobs.map(job => (<JobCard job={job} userId={userId} key={job.id} />))
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default FilterJob