"use client"

import { Company } from "@prisma/client"
import Image from "next/image"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"

interface propsTypes {
    company: Company
}

const FeaturedCompanyCard = ({ company }: propsTypes) => {
    const [hover, setHover] = useState(false)
    const router=useRouter()

    const handleHover = () => {

    }
    return (
        <div key={company.id} className="flex items-center   gap-2  text-lg font-bold  px-3 py-2 shadow-xl backdrop-blur-md cursor-pointer " onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            <div className="size-28 flex justify-center items-center border-2 dark:border-slate-700 border-light-border dark:bg-slate-800/20 bg-lightbg rounded-full  ">
                <div className="size-24 rounded-full border-2 border-slate-700 relative flex justify-center items-center ">
                    <Image className='rounded-full size-[90px] object-cover' src={company?.logo ? company.logo : ""} height={30} width={30} alt='' />
                    {
                        hover && (
                            <div onClick={() => { router.push(`/search?company=${company?.id}`) }} className="absolute inset-0 flex justify-center items-center bg-transparentBGprimary z-30" >
                                <p className=''>{company.companyTitle}</p>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedCompanyCard