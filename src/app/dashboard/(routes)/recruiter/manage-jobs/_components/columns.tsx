"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import {  ArrowUpDown, Edit, MoreHorizontal, TargetIcon } from "lucide-react"
import Link from "next/link"

export type JobsColumns = {
    id:string,
    title: string
    isPublished: boolean
    category: string
    company: string
    createdAt: string

}

export const columns: ColumnDef<JobsColumns>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Title
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
        accessorKey: "isPublished",
        header: "Published",
        cell: ({ row }) => {
            const { isPublished } = row.original

            return <div className={isPublished ? "text-green-600" : "text-red-500 "}>{isPublished ? "Published" : "Pending"}</div>
        },
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "company",
        header: "Company",
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
        header:"Action",
        cell: ({ row }) => {
            const { id } = row.original

            return <DropdownMenu>
                <DropdownMenuTrigger asChild><Button className="border-0" variant={"ghost"}><MoreHorizontal size={15} /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`manage-jobs/create-job/${id}`} >
                        <DropdownMenuItem className="flex items-center gap-2"><Edit size={15} />Edit</DropdownMenuItem>
                    </Link>
                   
                    <Link href={`manage-jobs/create-job/${id}/applicants`} >
                        <DropdownMenuItem className="flex items-center gap-2"><TargetIcon size={15} />Applicants</DropdownMenuItem>
                    </Link>


                </DropdownMenuContent>
            </DropdownMenu>

        },

    },
]
