"use client"

import { Button } from '@/components/ui/button';
import { Company, Job } from '@prisma/client';
import axios from 'axios';
import { Loader2Icon, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import CompanyTabs from './CompanyTabs';


interface propsTypes {
    job: Job[];
    userId: string | null;
    company: Company | null
}


const CompanyDetailsContent = ({ job, userId, company }: propsTypes) => {

    const isFollowed = userId && company?.followers.includes(userId)

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleFollow = async () => {

        try {
            setLoading(true)
            const response = await axios.patch(`/api/companies/${company?.id}/add-follower`)
            toast.success(`You are now following ${company?.companyTitle}`)

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        finally {

            router.refresh()
            setLoading(false)
        }

    }

    const handleUnfollow = async () => {
        try {
            setLoading(true)
            const response = await axios.patch(`/api/companies/${company?.id}/remove-follower`)
            toast.success(`You are unfollowed ${company?.companyTitle}`)

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        finally {

            router.refresh()
            setLoading(false)
        }
    }
    return (
        <div>
            {/* Company Title */}
            {/* Title */}
            {
                company && (
                    <div className="flex justify-between items-center px-3 -mt-10 dark:bg-darkbg bg-lightbg z-20  py-5 rounded-tr-2xl rounded-tl-2xl relative">
                <div className="flex gap-2 flex-col">
                    <div className="flex items-center gap-2">
                        <p className="text-xl">{company.companyTitle}</p>
                        <p className="text-xs">{company.followers.length} Followers</p>

                    </div>
                    <Link href={`companies/${company.id}`} passHref className="flex items-center gap-2">
                        {company?.logo ? (
                            <Image src={company?.logo} alt="" className="rounded-full" height={20} width={20} />
                        ) : (<p>No logo</p>)}
                        <p className="text-neutral-200/40 text-sm">{company.city}</p>
                    </Link>
                </div>


                {isFollowed ? (
                    <Button className="flex items-center gap-2 border border-light-border" variant={"outline"} onClick={handleUnfollow}>
                        {loading ? (
                            <>
                                Loading <Loader2Icon className='animate-spin' />
                            </>
                        ) : (
                            <>
                                Unfollow <Minus />
                            </>
                        )}
                    </Button>
                ) : (
                    <Button className="flex items-center gap-2 border border-light-border" variant={"outline"} onClick={handleFollow}>

                        {loading ? (
                            <>
                                Loading <Loader2Icon className='animate-spin' />
                            </>
                        ) : (
                            <>
                                Follow <Plus />
                            </>
                        )}
                    </Button>
                )}

            </div>
                )
            }

            {/* Company details */}
            <CompanyTabs userId={userId} job={job} company={company} />
        </div>
    )
}

export default CompanyDetailsContent