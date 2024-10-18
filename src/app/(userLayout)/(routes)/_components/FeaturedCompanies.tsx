import { db } from '@/lib/db'
import { Company } from '@prisma/client'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import FeaturedCompanyCard from './FeaturedCompanyCard'

const FeaturedCompanies = async () => {

    let companies: Company[] = []
    try {
        companies = await db.company.findMany({

        })
    } catch (error) {
        console.log(error)
    }

    return (

        <div className='py-10 flex flex-col gap-5'>
            <h2 className='text-xl'>Featured ocmpnay actively hired</h2>
            <div className="flex items-center justify-center gap-3 flex-wrap whitespace-nowrap">
                {
                    companies.map(company => (<FeaturedCompanyCard key={company.id} company={company}/>))
                }
            </div>
        </div>
    )
}

export default FeaturedCompanies