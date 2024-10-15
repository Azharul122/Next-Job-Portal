"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, File } from "lucide-react"
import Link from "next/link"
import CellColumn from "./CellColumn"

export type CompnayColumnsType = {
    id: string,
    fullName: string,
    email: string,
    contact: string,
    appliedAt: string,
    resume: string,
    name: string
}

export const JobApplicantsColumn: ColumnDef<CompnayColumnsType>[] = [

    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <Button
                    className="!pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fullname
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { fullName } = row.original

            return <div className="w-[17.5%] truncate">{fullName} <sup><abbr className={`${fullName ? "text-green-500" : "text-red-500"}`} title="Number of applicant">0</abbr></sup></div>
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <div
                    className="!pl-0"
                >
                    Email
                </div>
            )
        },
        cell: ({ row }) => {
            const { email } = row.original


            return <div className="w-[17.5%] truncate">{email ? (<Link href={`#`} className="rounded-full">{email}</Link>) : "No email"}</div>
        },
    },
    {
        accessorKey: "contact",
        header: ({ column }) => {
            return (
                <div
                    className="!pl-0"
                >
                    Contact
                </div>
            )
        },
        cell: ({ row }) => {
            const { contact } = row.original


            return <div className="w-[17.5%] truncate">{contact ? (<Link href={`#`} className="rounded-full">{contact}</Link>) : "No contact"}</div>
        },
    },

    {
        accessorKey: "resume",
        header: ({ column }) => {
            return (
                <div
                    className="!pl-0"
                >
                    Resume
                </div>
            )
        },
        cell: ({ row }) => {
            const { resume, name } = row.original


            return <div className="w-[22%] truncate">{resume ? (<Link href={`${resume}`} target="_blank" className="flex items-center gap-2 truncate"><File className="text-sm shrink-0" />{name}</Link>) : "No contact"}</div>
        },
    },

    {
        accessorKey: "appliedAt",
        header: ({ column }) => {
            return (
                <Button
                className="!pl-0"
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
            const { id, email, fullName } = row.original

            return (
                <CellColumn id={id} fullName={fullName} email={email} />
            )

        },

    },
]
