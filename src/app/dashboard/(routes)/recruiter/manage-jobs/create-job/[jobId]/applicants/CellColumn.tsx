"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BoxSelectIcon, Edit2, Loader2, MoreHorizontal, ScanEye, TargetIcon, Trash, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


interface propsTypes {
    id: string,
    fullName: string,
    email: string
}


const CellColumn = ({ id, fullName, email }: propsTypes) => {

    const [isSelecting, setIsSelkecting] = useState(false)
    const [isRejecting, setIsRejecting] = useState(false)


    const handleSelect = async () => {

    }


    const handleReject = async () => {

    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><Button className="border-0" variant={"ghost"}><MoreHorizontal size={15} /></Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={``} >
                    <DropdownMenuItem onClick={handleSelect} className="flex items-center gap-2">{isSelecting ? <><Loader2 size={15} className="animate-spin" />Loading ...</> : <><BoxSelectIcon size={15} />Select</>}</DropdownMenuItem>
                </Link>
                <Link href={""} >
                    <DropdownMenuItem onClick={handleReject} className="flex items-center gap-2">
                        {isRejecting ? <><Loader2 size={15} className="animate-spin" />Loading ...</> : <><X size={15} />Reject</>}
                    </DropdownMenuItem>
                </Link>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CellColumn