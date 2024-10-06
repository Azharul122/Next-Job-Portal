"use client"

import { Button } from "@/components/ui/button"
import qs from "query-string"
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface catItemsProps {
    lable: string,
    value: string
}

const CategoryItems = ({ lable, value }: catItemsProps) => {
    const pathname=usePathname()
    const router=useRouter()

    const searchParams=useSearchParams()
    const currentCategoryId=searchParams.get("categoryId")
    const currentCategoryTitle=searchParams.get("categoryTitle")
    const isElected=currentCategoryId===value

    const handleClick = () => { 
        const url=qs.stringifyUrl({
            url:pathname,
            query:{
                categoryTitle:currentCategoryTitle,
                categoryId: isElected?null:value
            }
           
        }, {
            skipNull:true,
            skipEmptyString:true
        })
        router.push(url)
    }
    return (
        <Button onClick={handleClick} variant={"outline"} className={cn("whitespace-nowrap rounded-full text-sm tracking-wider text-muted-foreground border dark:border-dark-border border-light-border px-3 py-1",isElected && "gradient-text")}>
            {
                lable
            }
        </Button>
    )
}

export default CategoryItems