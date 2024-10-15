
"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ActivityIcon, ArrowUpDown, DotIcon, Edit, EyeIcon, MoreHorizontal, ScanEye, TargetIcon, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import defaltCompanyLogo from "@/images/company_logo.png"
import { Job } from "@prisma/client"

export type CompnayColumnsType = {
id:string,
title:string,
company:string,
category:string,
appliedAt:string
}

export const AppliedJobColumn: ColumnDef<CompnayColumnsType>[] = [

    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Job Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { title } = row.original

            return <div>{title} <sup><abbr className={`${title ? "text-green-500" : "text-red-500"}`} title="Number of applicant">0</abbr></sup></div>
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => {
            const { company } = row.original


            return <div>{company ? (<Link href={``} className="rounded-full">{company}</Link>) : "No company"}</div>
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const { category } = row.original


            return <div>{category ? (<Link href={``} className="rounded-full">{category}</Link>) : "No company"}</div>
        },
    },

    {
        accessorKey: "appliedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    AppliedAt
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "Action",
        cell: ({ row }) => {
            const { id } = row.original

            return <Link href={`/jobs/job-details/${id}`}>
                <EyeIcon/>
            </Link>

        },

    },
]
