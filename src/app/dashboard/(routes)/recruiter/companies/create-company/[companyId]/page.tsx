import { auth } from '@/auth'
import { Progress } from '@/components/ui/progress'
// import { button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { AlertTriangleIcon, Check, Edit2Icon, SkipBack, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import defaultCompanyLogo from "@/images/company_logo.png"

import { FaRegQuestionCircle } from 'react-icons/fa'
import CompanyTitleForm from './_components/CompanyTittleForm'
import CompanyDescription from './_components/CompanyDescription'
import CompanyLogo from './_components/CompanyLogo'
import CompanySocialLinks from './_components/CompanySocialLinks'


const JobDetailsPage = async ({ params }: { params: { companyId: string } }) => {
  const id = await params.companyId
  const validObjectIdRegex = /^[a-fA-F0-9]{24}$/
  if (!validObjectIdRegex.test(id)) {
    return redirect("../")
  }

  const session = await auth()
  const userId = session?.user.id

  const companies = await db.company.findUnique({
    where: {
      id,
      userId
    }
  })

  const categorories = await db.category.findMany({
    orderBy: {
      categoryTitle: "asc"
    }
  })

  const option = [
    {
      label: "Full-time",
      value: "24pro"
    },
    {
      label: "Part-time",
      value: "24pro1"
    },
    {
      label: "Contractual",
      value: "24pro2"
    },
    {
      label: "Intership",
      value: "24pro3"
    },
    {
      label: "Project-based",
      value: "24pro4"
    }
  ]


  if (!companies) {
    return redirect("../")
  }

  const requiredFields = [companies.companyTitle, companies.logo, companies.description]
  const requiredFieldsLength = requiredFields.length

  const completedFields = requiredFields.filter(Boolean).length
  const isCompleted = requiredFields.every(Boolean)

  const parcentCompleted = (parseInt(Math.ceil(((completedFields * 100) / requiredFieldsLength)).toFixed(0)))
  

  return (
    <div className=''>
      <Link href={"./"} className='flex items-center gap-2 text-red-300'>
        <SkipBack className='' />
        Back
      </Link>

      {/*  */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 w-full">
        
          <div className="flex gap-2 items-center">
          <Image src={defaultCompanyLogo} alt='' height={30} width={30}/>

          <p className='text-xl pt-2 pb-1'>Setup comapny</p>
          </div>
          <Progress value={parcentCompleted} className='!w-full bg-gradient-custom  text-red-200'/>
          <p className='text-xs'>Completed <span>{completedFields}</span> out of <span>{requiredFieldsLength}</span></p>
        </div>
      </div>

      {/* Alert saection */}
      {/* <div className={`${job.isPublished ? "bg-green-500" : "bg-gradient-end "} w-full flex flex-initial items-center gap-2 !text-left p-2 rounded`}>
        {
          job.isPublished ? <Check className='text-green-200' /> : <AlertTriangleIcon className='text-red-500' />
        }
        {
          job.isPublished ? "Job visible" : "Job not visible"
        }

      </div> */}

      {/* Edit content section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-5">
        {/* Left */}
        <div className="customize-panel ">
          <div className="flex items-center gap-2">
            <Edit2Icon className='gradient-text' size={20}/>
            Customise fields
          </div>
          {/* Company Title */}
          <CompanyTitleForm companyId={id} intialCompany={companies}/>

          {/* Company Descrition*/}
          <CompanyDescription companyId={id} intialComapny={companies} isRequired={true}/>



          {/* Company Logo  */}
          <CompanyLogo companyId={id} initialCompany={companies}/>


          {/* Sort description */}





          {/* Shift timing */}
          {/* <ShiftTiming intialJob={job} jobId={id} isRequired={true}/> */}




          {/* Hourly rate edit */}

          {/* Job mode */}


          {/* Job Experience */}





        </div>
        {/*  **************** Right ***************** */}
        <div className="">
          <div className="flex items-center gap-2">
            <FaRegQuestionCircle />
            Required fields
          </div>

          {/* Company social info */}
          <CompanySocialLinks companyId={id} intialComapny={companies} isRequired={true}/>

        </div>


        {/* **************** Description ********** */}
        <div className="col-span-2">
          {/* Full description */}
        </div>
      </div>




    </div>
  )
}

export default JobDetailsPage