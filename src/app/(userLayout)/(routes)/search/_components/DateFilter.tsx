"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React, { useState } from 'react'

const DateFilter = () => {

    const router = useRouter()
    const pathname = usePathname()
    const createAtParam=useSearchParams()

    const caValue=createAtParam.get("createdAtFilter")
    // const data=[
    //     {
    //         label:"Toady",
    //         value:"toady"
    //     },
    //     {
    //         label:"Yeasterday",
    //         value:"yeasterday"
    //     },
    //     {
    //         label:"This week",
    //         value:"thisWeek"
    //     },
    //     {
    //         label:"This Month",
    //         value:"ThisMonth"
    //     },
    //     {
    //         label:"This Yeasr",
    //         value:"thisYear"
    //     }
    // ]

    const data = [
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "thisWeek", label: "This Week" },
        { value: "lastWeek", label: "Last Week" },
        { value: "thisMonth", label: "This Month" },
    ];

    

    const [selectValue,setSelectedValue]=useState(caValue || "")

    const handleData = (value: string) => {
        setSelectedValue(value)

        const currentSearchParams = queryString.parseUrl(window.location.href).query

        const updatedQueryParams = { ...currentSearchParams, createdAtFilter: value }
        

        const url = queryString.stringifyUrl({
            url: pathname,
            query: updatedQueryParams
        }, {
            skipNull: true,
            skipEmptyString: true
        })

        router.push(url)
    }


    return (
        <div className=''>
            <Select value={selectValue}  onValueChange={(selected) => handleData(selected)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Flter by date" />
                </SelectTrigger>
                <SelectContent>
                    {
                        data.map(da => (<SelectItem value={da.value} key={da.value}>{da.label}</SelectItem>))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default DateFilter