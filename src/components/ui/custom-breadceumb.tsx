import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

interface breadCrumbProps {
    breaderCrumbPage: string,
    breadcrumbItems?: { link: string, label: string }[]
}


const BreadCrumb = ({ breadcrumbItems, breaderCrumbPage }: breadCrumbProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="flex items-center gap-2" href="/"><Home className="text-sm size-4" /> Home</BreadcrumbLink>
                </BreadcrumbItem>

                {/* BreadCrumb Items */}
                {
                    breadcrumbItems && breadcrumbItems.map((bitem, i) => (
                        <>
                            <BreadcrumbSeparator key={i}/>
                                <BreadcrumbItem key={i}>
                                    <BreadcrumbLink href={bitem.link}>
                                    {
                                        bitem.label
                                    }
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                           
                        </>
                    ))
                }
                <BreadcrumbSeparator/>
                <BreadcrumbPage>
                {
                    breaderCrumbPage
                }
                </BreadcrumbPage>
            </BreadcrumbList>
        </Breadcrumb>

    )
}

export default BreadCrumb