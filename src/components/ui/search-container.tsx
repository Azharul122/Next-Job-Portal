"use client"

import {  Search, X } from "lucide-react"
import { useState } from "react"

const SearchContainer = () => {
    const [query, setQuery] = useState("")
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