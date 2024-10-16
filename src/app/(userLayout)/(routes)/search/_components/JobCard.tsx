"use client"

import { Button } from '@/components/ui/button'
import { Company, Job } from '@prisma/client'
import { Bookmark, Calendar, Hourglass, Loader, Timer, WorkflowIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { formatDistanceToNow } from "date-fns"
import Link from 'next/link'
import { truncate } from 'lodash'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface JobCardProps {
    userId: string | null,
    job: Job
}

const JobCard = ({ userId, job }: JobCardProps) => {
    const tyJob = job as Job & {
        company: Company | null;
    };

    const company = tyJob?.company;
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const rouetr = useRouter()
    const isSavedJob = userId && job.savedUser.includes(userId)

    const addToBookmark = async (e: React.MouseEvent) => {

        try {
            e.stopPropagation();
            setBookmarkLoading(true);

            if (isSavedJob) {
                await axios.patch(`/api/jobs/${job.id}/remove-bookmark`)
                toast.success("Job removed")
            } else {
                await axios.patch(`/api/jobs/${job.id}/save-bookmark`)
                toast.success("Job saved")
            }


            rouetr.refresh()

        } catch (error) {
            console.log(error)
        }
        finally {
            setBookmarkLoading(false)
        }

    };


    const handleRedirect = (id: string) => {
        rouetr.push(`/jobs/job-details/${id}`)


    }
    return (
        <div onClick={() => handleRedirect(job.id)} className='text-muted-foreground backdrop-blur-md'>
            <div className='relative  z-10  px-3 py-4 space-y-3 cursor-pointer transition duration-200 hover:bg-gray-100 dark:hover:bg-darkbg border-2 dark:border-slate-700 border-light-border dark:bg-slate-800/20 bg-lightbg p-6 shadow-xl backdrop-blur-md'>
                <div className="w-full relative">
                    <p className='dark:text-destructive-foreground'>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
                    <Link href={`#${job.id}`}>
                        <Button variant={"link"} className="absolute top-1/2 right-5 -translate-y-1/2 z-30" onClick={addToBookmark}>
                            {bookmarkLoading ? <Loader className='animate-spin' /> : <Bookmark className={` text-lg z-20 ${isSavedJob ? "dark:text-gradient-start text-gradient-end" : ""}`} />}
                        </Button></Link>
                </div>

                {/* Company */}
                <div className="company flex gap-5 items-center">
                    {company?.logo && (
                        <Link className='group-hover:animate-bounce' href={`/companies/${company?.id}`} onClick={(e) => e.stopPropagation()}>
                            <Image src={company.logo} className='shrink-0 rounded-full' alt='Company Logo' height={50} width={50} />
                        </Link>
                    )}
                    <div>
                        <h3 className='text-xl dark:text-destructive-foreground'>{job.title}</h3>
                        <Link href={`/companies/${company?.id}`} className='text-sm dark:text-neutral-200/25 hover:underline text-neutral-400' onClick={(e) => e.stopPropagation()}>
                            {company?.companyTitle}
                        </Link>
                    </div>
                </div>

                {/* Sort description */}
                <div>
                    {
                        job.sort_description && <p className='text-opacity-10 text-justify'>{truncate(job.sort_description, {
                            length: 180,
                            omission: "..."
                        })}</p>
                    }
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
                    <div className="pl-2 flex items-center gap-2 border-l-2 bg-gradient-to-l from-gradient-start/5 dark:to-darkbg/5 to-white">
                        <Timer className='size-4 text-muted-foreground shrink-0' />
                        <p>{job.shiftTimimg}</p>
                    </div>
                    <div className="pl-2 flex items-center gap-2 border-l-2 bg-gradient-to-l from-gradient-start/5 dark:to-darkbg/5 to-white">
                        <WorkflowIcon className='size-4 text-muted-foreground shrink-0' />
                        <p>{job.workMode}</p>
                    </div>
                    <div className="pl-2 flex items-center gap-2 border-l-2 bg-gradient-to-l from-gradient-start/5 dark:to-darkbg/5 to-white">
                        <Hourglass className='size-4 text-muted-foreground shrink-0' />
                        <p>${job.hourlyRate}/h</p>
                    </div>
                    <div className="pl-2 flex items-center gap-2 border-l-2 bg-gradient-to-l from-gradient-start/5 dark:to-darkbg/5 to-white">
                        <Calendar className='size-4 text-muted-foreground shrink-0' />
                        <p className='text-sm'>
                            {job.yearsOfExperience === '0' || job.yearsOfExperience === null || job.yearsOfExperience === undefined
                                ? 'Fresher'
                                : ` ${job.yearsOfExperience} years +`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
