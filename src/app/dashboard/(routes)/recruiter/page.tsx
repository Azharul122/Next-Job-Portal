
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { getTotalJobsLength, getRecruiterTotalCompanyLength, getRecruiterTotalJobsLength, getTotalCompanyLength, getMonthWiseJobChart, getMonthWiseCompanyChart } from './getRecruiterDashboardData'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import JobsChart from './_components/JobsChart'

const RecruiterHomePage = async () => {
    const session = await auth()
    const userId = session?.user.id
    if (!userId) redirect("/sign-in")
    const totalJobs = await getTotalJobsLength()
    const totalRecruiterJobs = await getRecruiterTotalJobsLength(userId)
    const totalCompanies = await getTotalCompanyLength()
    const totalRecruiterCompanyLegth = await getRecruiterTotalCompanyLength(userId)
    const jobsdata = await getMonthWiseJobChart(userId)
    const companyData = await getMonthWiseCompanyChart(userId)


    return (
        <div>
            <h2 className='pb-4'>Recruiter Dashboard</h2>
            <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border dark:bg-darkbg bg-lightbg backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total jobs</p>
                    <p className='text-2xl'>{totalJobs}</p>
                </div>
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border dark:bg-darkbg bg-lightbg backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded">
                    <p className='text-sm dark:text-muted-foreground '>You created jobs</p>
                    <p className='text-2xl'>{totalRecruiterJobs}</p>
                </div>
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border dark:bg-darkbg bg-lightbg backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total company</p>
                    <p className='text-2xl'>{totalCompanies}</p>
                </div>
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border dark:bg-darkbg bg-lightbg backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded ">
                    <div className='w-full text-sm dark:text-muted-foreground truncate'>Total company created by you</div>
                    <p className='text-2xl'>{totalRecruiterCompanyLegth}</p>
                </div>

            </div>
            <Separator className='my-4' />

            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col border-2 dark:border-slate-700 border-light-border dark:bg-darkbg bg-lightbg backdrop-blur-xl shadow-xl px-3 py-2  rounded justify-center">
                    <p className='text-sm dark:text-muted-foreground '>Monthly job created</p>
                    <JobsChart data={jobsdata}/>
                </div>
                <div className="flex flex-col  border-2 dark:border-slate-700 border-light-border dark:bg-darkbg bg-lightbg backdrop-blur-xl shadow-xl px-3 py-2  rounded justify-center">
                    <p className='text-sm dark:text-muted-foreground '>Monthly company created</p>
                    <JobsChart  data={companyData}/>
                </div>
            </div>
        </div>
    )
}

export default RecruiterHomePage