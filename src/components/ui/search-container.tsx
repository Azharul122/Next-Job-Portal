"use client"

import {  Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "../../../hooks/use-debounce"
import queryString from "query-string"
// import { url } from "inspector"

const SearchContainer = () => {
    const router=useRouter()
    const searchParams=useSearchParams()
    const pathname=usePathname()

    const title=searchParams.get("title")
    const categoryId=searchParams.get("categoryId")
    const workMode=searchParams.get("workMode")
    const shiftTimimg=searchParams.get("shiftTimimg")
    const createdAtFilter=searchParams.get("createdAtFilter")
    
    const [query, setQuery] = useState(title || "")
    const debounceValue=useDebounce(query)

    useEffect(()=>{
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                title: debounceValue,
                categoryId,
                workMode,
                shiftTimimg,
                createdAtFilter, 
            },
        }, {
            skipNull: true,
            skipEmptyString: true,
        });
        
    router.push(url)
    },[
        query,router,pathname,createdAtFilter,workMode,title,shiftTimimg,categoryId
    ])
    
    const handleQuery = () => {

    }
    return (
        <div className="relative w-[25rem]">
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className="px-5 py-2 bg-transparent border rounded-full w-full border-light-border dark:border-dark-border" />

            {/* Search Button */}
            <Search onClick={handleQuery} className={`absolute top-1/2 duration-500 ${query ? "right-9" : "right-3"} -translate-y-1/2 text-gradient-start size-5`} />

            {/* Cross button */}
            {
                query && <X onClick={() => setQuery("")} className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 text-gradient-end size-5" />
            }
        </div>
    )
}

export default SearchContainer