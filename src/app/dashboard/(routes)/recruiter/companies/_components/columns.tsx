"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ActivityIcon, ArrowUpDown, DotIcon, Edit, MoreHorizontal, ScanEye, TargetIcon, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import defaltCompanyLogo from "@/images/company_logo.png"

export type CompnayColumnsType = {

    companyTitle: string
    logo: string
    createdAt: string

}

export const CompanyColumns: ColumnDef<CompnayColumnsType>[] = [
   
    {
        accessorKey: "companyTitle",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { companyTitle } = row.original

            return <div>{companyTitle} <sup><abbr className={`${companyTitle ? "text-green-500" : "text-red-500"}`} title="Number of applicant">0</abbr></sup></div>
        },
    },
    {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => {
            const { logo } = row.original
           

            return <div>{logo ? (<Image className="rounded-full" src={logo} height={40} width={40} alt="Insert" />) : (<Image src={defaltCompanyLogo} className="rounded-full" height={40} width={40} alt="Insert" />)}</div>
        },
    },

    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CreatedAt
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "Action",
        cell: ({ row }) => {
            const { id } = row.original

            return <DropdownMenu>
                <DropdownMenuTrigger asChild><Button className="border-0" variant={"ghost"}><MoreHorizontal size={15} /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`companies/create-company/${id}`} >
                        <DropdownMenuItem className="flex items-center gap-2"><Edit size={15} />Edit</DropdownMenuItem>
                    </Link>
                    <Link href={""} >
                        <DropdownMenuItem className="flex items-center gap-2"><ScanEye size={15} />View</DropdownMenuItem>
                    </Link>
                    <Link href={""} >
                        <DropdownMenuItem className="flex items-center gap-2"><Trash size={15} />Delete</DropdownMenuItem>
                    </Link>
                    <Link href={""} >
                        <DropdownMenuItem className="flex items-center gap-2"><TargetIcon size={15} />Application</DropdownMenuItem>
                    </Link>


                </DropdownMenuContent>
            </DropdownMenu>

        },

    },
]
