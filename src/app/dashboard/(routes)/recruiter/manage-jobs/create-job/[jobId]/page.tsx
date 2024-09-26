import { auth } from '@/auth'
// import { button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { AlertTriangleIcon, Check, Edit2Icon, SkipBack, Trash } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import JobPublishAction from './_components/JobPublishAction'
import { Button } from '@/components/ui/button'
import TileForm from './_components/TileForm'

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const id = await params.jobId
  const validObjectIdRegex = /^[a-fA-F0-9]{24}$/
  if (!validObjectIdRegex.test(id)) {
    return redirect("../")
  }

  const session = await auth()
  const userId = session?.user.id
  console.log(userId, id)
  const job = await db.job.findUnique({
    where: {
      id,
      userId
    }
  })

  if (!job) {
    return redirect("../")
  }

  const requiredFields = [job.sort_description, job.Description, job.sort_description, job.deadline]
  const requiredFieldsLength = requiredFields.length

  const completedFields = requiredFields.filter(Boolean).length
  const isCompleted = requiredFields.every(Boolean)


  return (
    <div className=''>
      <Link href={"./"} className='flex items-center gap-2 text-red-300'>
        <SkipBack className='' />
        Back
      </Link>

      {/*  */}
      <div className="flex justify-between items-center">
        <div className="">
          <p className='text-lg pt-2 pb-1'>Setup job</p>
          Completed <span>{completedFields}</span> out of <span>{requiredFieldsLength}</span>
        </div>
        <JobPublishAction disabled={!isCompleted} isPublished={job.isPublished} jobId={id} />
      </div>

      {/* Alert saection */}
      <div className={`${job.isPublished ? "bg-green-500" : "bg-gradient-end "} w-full flex flex-initial items-center gap-2 !text-left p-2 rounded`}>
        {
          job.isPublished ? <Check className='text-green-200' /> : <AlertTriangleIcon className='text-red-500' />
        }
        {
          job.isPublished ? "Job visible" : "Job not visible"
        }

      </div>

      {/* Edit content section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-5">
        <div className="customize-panel ">
          <div className="flex items-center gap-2">
            <Edit2Icon />
            Custize fields
          </div>
          {/* Title edit */}
          <TileForm intialJob={job} jobId={id} />
        </div>
      </div>

    </div>
  )
}

export default JobDetailsPage