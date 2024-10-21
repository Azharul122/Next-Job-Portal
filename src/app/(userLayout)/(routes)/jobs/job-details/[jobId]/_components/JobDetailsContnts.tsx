"use client";

import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/ui/custom-breadceumb";
import { Attachment, Company, Job, Resumes, UserProfile } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Preview from "@/components/ui/Preview";
import ApplyModal from "./ApplyModal";
import { useState } from "react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

interface propsTypes {
    job: Job & { attachments: Attachment[], company: Company | null };
    jobId: string;
    userProfile: UserProfile & { resumes: Resumes[] } | null;
}

const JobDetailsContnts = ({ job, jobId, userProfile }: propsTypes) => {
    const isApplied = userProfile?.appliedJobs.some((aj) => aj.jobId === jobId);
    const [loading, setLoading] = useState(false)

    const { data } = useSession()
    const userId = data?.user.id

    if(!userId){
        redirect("/sign-in")
    }

    const [open, setOpen] = useState(false)
    const router = useRouter()

    const onApplied = async () => {
        setLoading(true)
        try {
            const response = await axios.patch(`/api/users/${userId}/applied-job`, jobId)

            toast.success("Applied")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        finally {
            setOpen(false)
            setLoading(false)
            router.refresh()
        }
    }
    return (
        <div>



            {/* Apply modal */}
            <ApplyModal isOpen={open} onClose={() => setOpen(false)} isConfirm={onApplied} loading={loading} userProfile={userProfile} />

            {/* Breadcrumb */}
            <BreadCrumb breadcrumbItems={[{ link: "/jobs", label: "jobs" }]} breaderCrumbPage={`${job?.title !== undefined ? job.title : ""}`} />

            {/* is applied  */}
            {
                isApplied && (
                    <div className="dark:bg-darkbg text-green-400 bg-lightbg px-3 py-4 border-l-4 dark:border-dark-border border-light-border my-2">
                        You are applied this job
                    </div>
                )
            }

            {/* job cover image */}
            <div className="my-3 w-full h-[200px] relative overflow-hidden">
                {job.img && (<Image
                    src={job.img}
                    alt="Job Cover Image"
                    layout="fill"
                />)}
            </div>

            {/* Title */}
            <div className="flex justify-between items-center mt-5">
                <div className="flex gap-2 flex-col">
                    <p className="text-xl">{job.title}</p>
                    <Link href={`/companies/${job.companyId}`} passHref className="flex items-center gap-2">
                        {job.company?.logo ? (
                            <Image src={job.company?.logo} alt="" className="rounded-full" height={20} width={20} />
                        ) : (<p>No logo</p>)}
                        <p className="text-neutral-200/40 text-sm">{job?.company?.companyTitle}</p>
                    </Link>
                </div>
                {isApplied ? (
                    <Button disabled className="" variant={"outline"}>
                        Applied
                    </Button>
                ) : (
                    <Button className="" variant={"outline"} onClick={() => setOpen(true)}>
                        Apply now
                    </Button>
                )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3 mt-5">
                <p className="text-lg">Job Description</p>
                <Preview value={job?.Description ? job.Description : ""} />
            </div>
            {/* Attachments */}
            <div className="flex flex-col gap-3 my-3">

                {
                    job.attachments && job.attachments.length > 0 && (
                        <>

                            <p className="text-lg">Attachments</p>
                            {
                                job.attachments.map((attachment) => (
                                    <div className="" key={job.id}>
                                        <Link target="_blank" href={attachment.url} download>
                                            {attachment.name}
                                        </Link>
                                    </div>
                                ))
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default JobDetailsContnts;
