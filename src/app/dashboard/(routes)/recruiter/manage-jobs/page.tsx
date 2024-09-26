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


const page = () => {
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
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    )
}

export default page