import { auth } from "@/auth"
import { DataTable } from "@/components/ui/data-table"
import { db } from "@/lib/db"
import { AppliedJobColumn } from "./_components/AppliedJobColumn"
import { redirect } from "next/navigation"

const AppliedJobsPage = async () => {

    const session = await auth()
    const userId = session?.user.id
    
    
    if(!userId){
        return redirect("/sign-in")
    }
    const userProfile = await db.userProfile.findUnique({
        where: {
            userId
        },

    })

    // console.log(userProfile)

   

    const jobs = await db.job.findMany({
        
        include: {
            category: true,
            company: true
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    console.log(jobs)

    const filterAppliedJobs = userProfile && userProfile.appliedJobs.length > 0 ? jobs.filter(job => userProfile.appliedJobs.some(aj => aj.jobId === job.id)).map(job => ({
        ...job,
        appliedAt: userProfile.appliedJobs.find(aj => aj.jobId === job.id)?.appliedAt
    })) : []


    const formatDate = (dateStr: Date) => {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const formattedJobs = filterAppliedJobs.map(job => ({
        id: job.id,
        company: job.company ? job.company.companyTitle : "",
        category: job.category ? job.category.categoryTitle : "",
        appliedAt: job.appliedAt ? formatDate(job.appliedAt) : "",
        title: job.title
    }))




    return (
        <div className="py-5">
            <p className="text-xl">Applied Jobs</p>
            <DataTable columns={AppliedJobColumn} data={formattedJobs} searchKey="company" />
        </div>
    )
}

export default AppliedJobsPage