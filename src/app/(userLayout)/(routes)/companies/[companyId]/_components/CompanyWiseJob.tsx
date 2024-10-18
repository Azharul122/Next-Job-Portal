import { Company, Job } from "@prisma/client";
import JobDetailsPage from "../../../jobs/job-details/[jobId]/page";
import JobCard from "../../../search/_components/JobCard";

interface propsTypes {
    job: Job[];
    userId: string | null;
}

const CompanyWiseJob = ({ job, userId }: propsTypes) => {

    return (

        <>
            {
                job && job.length > 0 && (
                    <div className='py-5 w-full'>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 justify-center w-full">

                            {job.map((j) => (
                                <JobCard key={j.id} job={j} userId={userId ? userId : null} />
                            ))}

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CompanyWiseJob