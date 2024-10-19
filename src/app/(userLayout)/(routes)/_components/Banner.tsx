"use client"
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Banner = () => {

    const [query, setQuery] = useState("")
    const router = useRouter()



    const handleQuery = () => {
        router.push(`/search?title=${query}`)
        router.refresh()
    }


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleQuery();
            }
        };


        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [query,handleQuery]);

    return (
        <div className='flex flex-col gap-3 items-center justify-center py-5'>
            <h2 className='md:text-2xl text-xl  font-bold gradient-text'> Identify your ideal job to achieve your career <span className="animate-accordion-down bg-gradient-to-r from-gradient-start  to-gradient-end bg-[length:100%_2px] bg-no-repeat bg-bottom pb-2">goals</span> </h2>
            <p>100+ job posted every day</p>
            {/* <SearchContainer /> */}

            <div className="relative xs:w-[16rem] md:w-[25rem] w-[12rem]">
                <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className="px-5 py-2 bg-transparent border rounded-full w-full border-light-border dark:border-dark-border" />

                {/* Search Button */}
                <Search onClick={handleQuery} className={`absolute top-1/2 duration-500 ${query ? "right-9" : "right-3"} -translate-y-1/2 text-gradient-start size-5`} />

                {/* Cross button */}
                {
                    query && <X onClick={() => setQuery("")} className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 text-gradient-end size-5" />
                }
            </div>
        </div>
    )
}

export default Banner