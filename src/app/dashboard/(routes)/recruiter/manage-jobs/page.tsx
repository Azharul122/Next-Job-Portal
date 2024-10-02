import ButtonPlus from "@/components/Navbar/ButtonPlus"
import { Plus } from "lucide-react"
import Link from "next/link"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { DataTable } from "@/components/ui/data-table"
import { columns, JobsColumns } from "./_components/columns"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"


const ManageJobs = async () => {

    const session = await auth()
    const id = session?.user.id

    if (!id) {
        return redirect("./")
    }

    const jobs = await db.job.findMany({
        where: {
            userId: id
        },
        include: {
            category: true,
            company: true
        },
        orderBy: {
            createdAt: "desc"
        }

    })

    const formatDate = (dateStr: Date) => {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const formatedJobs: JobsColumns[] = jobs.map((job) => ({
        id: job.id,
        category: job?.category ? job.category.categoryTitle : "N/A",
        createdAt: formatDate(job.createdAt),
        isPublished: job.isPublished,
        title: job.title,
        company: job.company?job.company.companyTitle:"N/A"
    }))


    return (
        <div>
            <span>
                Manage your posted jobs
            </span>
            <div className="py-10">
                <div className=" flex flex-col gap-10">
                    <div className="flex justify-between items-center">
                        <ButtonPlus icon={Plus} link={"manage-jobs/create-job"} title={"Create job"} />

                        {/* Sort  */}
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="a2z">A-Z</SelectItem>
                                <SelectItem value="z2a">Z-A</SelectItem>
                                <SelectItem value="letest">Letest job</SelectItem>
                                <SelectItem value="oldest">Oldest job</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>

                    {/* Data table */}
                    <DataTable columns={columns} data={formatedJobs} searchKey="title"/>

                </div>
            </div>
        </div>
    )
}

export default ManageJobs