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
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { CompanyColumns, CompnayColumnsType } from "../companies/_components/columns"


const CompanyPage = async () => {

    const session = await auth()
    const id = session?.user.id

    if (!id) {
        return redirect("./")
    }

    const companies = await db.company.findMany({
        where: {
            userId: id
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

    const formatedJobs: CompnayColumnsType[] = companies.map((job) => ({
        id: job.id,
        companyTitle: job?.companyTitle ? job.companyTitle : "N/A",
        createdAt: formatDate(job.createdAt),
        logo: job.logo ? job.logo : "",

    }))


    return (
        <div>
            <span>
                Manage your posted company
            </span>
            <div className="py-10">
                <div className=" flex flex-col gap-10">
                    <div className="flex justify-between items-center">
                        <ButtonPlus icon={Plus} link={"companies/create-company"} title={"Create job"} />

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
                    <DataTable columns={CompanyColumns} data={formatedJobs} searchKey="title" />

                </div>
            </div>
        </div>
    )
}

export default CompanyPage