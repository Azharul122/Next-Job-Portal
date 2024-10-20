"use client"

import { BriefcaseBusinessIcon, Home, List, LucideHome, Settings, Users, HomeIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"




const adminRoutes = [

    {
        icon: Home,
        route_name: "Home",
        link: "/dashboard/admin"
    },
    {
        icon: Users,
        route_name: "Manage users",
        link: "/dashboard/admin/manage-users"
    },
    {
        icon: Settings,
        route_name: "Settings",
        link: "/dashboard/admin/settings"
    },
    {
        icon: BriefcaseBusinessIcon,
        route_name: "Manage Jobs",
        link: "/dashboard/admin/manage-jobs"
    },
    {
        icon: LucideHome,
        route_name: "Manage Company",
        link: "/dashboard/admin/manage-company"
    },

]
const recruiterRoutes = [
    {
        icon: Home,
        route_name: "Home",
        link: "/dashboard/recruiter"
    },

    {
        icon: Settings,
        route_name: "Settings",
        link: "/dashboard/recruiter/settings"
    },
    {
        icon: HomeIcon,
        route_name: "Companies",
        link: "/dashboard/recruiter/companies"
    },
    {
        icon: List,
        route_name: "Manage Jobs",
        link: "/dashboard/recruiter/manage-jobs"
    },

]

const DashBoardRoutes = () => {
    // const pathname = usePathname()// const route=useRouter()
    // const isAdmin = pathname.startsWith("/dashboard/admin")
    // const route = isAdmin ? adminRoutes : recruiterRoutes

    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/dashboard/admin");
    const route = isAdmin ? adminRoutes : recruiterRoutes;

    return (
        <div className=" h-full  w-full pt-3">
            {

                route.map((routes) => {

                    const isActive = pathname === routes?.link || pathname.startsWith(`${routes?.link}/`);
                    const exactMatch = pathname === routes?.link;



                    return (

                        <Link href={routes.link} key={routes.link} className={`w-full flex items-center gap-2  pl-3  py-4 ${isActive && exactMatch  ? `${isAdmin?"border-gradient-start text-gradient-end ":"border-gradient-end text-gradient-start"}  border-r-4  dark:bg-[#000B1F] bg-[#F8F8F8] overflow-hidden` : "border-0"}`}>
                            {routes.icon && <routes.icon size={20} />}
                            {routes.route_name}
                        </Link>
                    )
                }
                )
            }


        </div>
    )
}

export default DashBoardRoutes