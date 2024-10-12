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
import CatrgoryForm from './_components/CatrgoryForm'
import ImageForm from './_components/ImageForm'
import SortDescription from './_components/SortDescription'
import FullDescription from './_components/Description'
import ShiftTiming from './_components/ShiftTiming'
import HourlyRateForm from './_components/HourlyRateForm'
import JobModeForm from './_components/JobModeForm'
import WorkExperienceForm from './_components/WorkExperienceForm'
import { FaRegQuestionCircle } from 'react-icons/fa'
import TagsForm from './_components/TagsForm'
import CompanyForm from './_components/CompanyForm'
import { AttachmentsForm } from './_components/AttachmentForm'
// import AttachmentForm from './_components/AttachmentForm'


const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const id = await params.jobId
  const validObjectIdRegex = /^[a-fA-F0-9]{24}$/
  if (!validObjectIdRegex.test(id)) {
    return redirect("../")
  }

  const session = await auth()
  const userId = session?.user.id
  // console.log(userId, id)
  const job = await db.job.findUnique({
    where: {
      id,
      userId
    },
    include:{
      attachments:{
        orderBy:{
          createdAt:"asc"
        }
      }
    }
  })

  const categorories = await db.category.findMany({
    orderBy: {
      categoryTitle: "asc"
    }
  })
  const companies = await db.company.findMany({
    where:{
      userId
    },
    orderBy: {
      createdAt: "asc"
    }
  })

 
 
  const option = [
    {
      label: "Full time",
      value: "Full-time"
    },
    {
      label: "Part time",
      value: "Part-time"
    },
    {
      label: "Contractual",
      value: "Contractual"
    },
    {
      label: "Internship",
      value: "Internship"
    },
    {
      label: "Project based",
      value: "Project-based"
    }
  ]


  if (!job) {
    return redirect("../")
  }

  const requiredFields = [job.sort_description, job.Description,job.title]
  const requiredFieldsLength = requiredFields.length

  const completedFields = requiredFields.filter(Boolean).length
  const isCompleted = requiredFields.every(Boolean)


  return (
    <div className=''>
      <Link href={"../"} className='flex items-center gap-2 text-red-300'>
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
        {/* Left */}
        <div className="customize-panel ">
          <div className="flex items-center gap-2">
            <Edit2Icon />
            Custize fields
          </div>
          {/* Title edit */}
          <TileForm intialJob={job} jobId={id} />

          {/* Choose category */}
          <CatrgoryForm intialJob={job} jobId={id} options={categorories.map(category => ({
            label: category.categoryTitle,
            value: category.id
          }))} />

          {/* Job image  */}
          <ImageForm intialJob={job} jobId={id} />


          {/* Sort description */}
          <SortDescription intialJob={job} jobId={id} isRequired={true} />





          {/* Shift timing */}
          {/* <ShiftTiming intialJob={job} jobId={id} isRequired={true}/> */}


          <ShiftTiming intialJob={job} jobId={id} options={option} />


          {/* Hourly rate edit */}
          <HourlyRateForm intialJob={job} jobId={id} />

          {/* Job mode */}
          <JobModeForm intialJob={job} jobId={id} options={option} />


          {/* Job Experience */}
          <WorkExperienceForm intialJob={job} jobId={id} options={option} />





        </div>
        {/* Right */}
        <div className="">
          <div className="flex items-center gap-2">
            <FaRegQuestionCircle />
            Required fields
          </div>

          {/* tags form */}
          <TagsForm intialJob={job} jobId={id} isRequired={true} />

          {/*  */}
          <CompanyForm intialJob={job} jobId={id} options={companies.map(company => ({
            label: company.companyTitle,
            value: company.id
          }))} />

          {/* Atachment Form */}
          <AttachmentsForm initialData={job} jobId={id}  />

        </div>


        {/* Description */}
        <div className="col-span-2">
          {/* Full description */}
          <FullDescription intialJob={job} jobId={id} isRequired={true} />
        </div>
      </div>




    </div>
  )
}

export default JobDetailsPage