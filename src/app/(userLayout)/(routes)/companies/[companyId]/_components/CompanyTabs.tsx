"use client"

import { Company, Job } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Preview from "@/components/ui/Preview";
import CompanyDetails from "../page";
import JobDetailsPage from "@/app/dashboard/(routes)/recruiter/manage-jobs/create-job/[jobId]/page";
import CompanyWiseJob from "./CompanyWiseJob";



interface propsTypes {
    job: Job[];
    userId: string | null;
    company: Company | null
}


const CompanyTabs = ({ job, userId, company }: propsTypes) => {
    return (
        <div>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="joinus">Join us</TabsTrigger>
                    <TabsTrigger value="career">Career</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    {
                        company && company.overView ? (
                            <Preview value={company.overView} />
                        ) : (
                            <p className="text-red-500">Company overview not added</p>
                        )
                    }
                </TabsContent>
                <TabsContent value="joinus">
                    {
                        company && company.whyJoinUs ? (
                            <Preview value={company.whyJoinUs} />
                        ) : (
                            <p className="text-red-500">Data not avialable right now</p>
                        )
                    }
                </TabsContent>
                <TabsContent value="career">
                    <CompanyWiseJob job={job} userId={userId} />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default CompanyTabs