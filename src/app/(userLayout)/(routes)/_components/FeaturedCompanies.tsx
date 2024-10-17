import { db } from '@/lib/db'
import { Company } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const FeaturedCompanies = async () => {
    const companies: Company[] = await db.company.findMany({

    })
    return (

        <div className='py-10 flex flex-col gap-5'>
            <h2 className='text-xl'>Featured ocmpnay actively hired</h2>
            <div className="flex items-center gap-3 flex-wrap whitespace-nowrap">
                {
                    companies.map(company => <div key={company.id} className="flex items-center gap-2 text-muted-foreground text-sm border dark:border-dark-border border-light-border px-3 py-2 shadow-xl backdrop-blur-md">
                        <Image className='rounded-full size-[30px] object-cover' src={company?.logo ? company.logo : ""} height={30} width={30} alt='' />
                        <p className='text-muted-foreground'>{company.companyTitle}</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default FeaturedCompanies