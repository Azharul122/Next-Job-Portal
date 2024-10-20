
import logo from "@/images/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from './DarkMode'
import { auth } from '@/auth'
import { DropdownMenu } from '../ui/dropdown-menu'
import BottomNavbar from './BottomNavbar'
import ButtonPlus from './ButtonPlus'
import { LayoutDashboardIcon } from 'lucide-react'
import UserItemsProps from "./UserItemsProps";
import { BrowsCategoryItems } from "./BrowsCategoryItems";
import { db } from "@/lib/db";
import { Category, Job } from "@prisma/client";
import ProfileTrigger from "./ProfileTrigger";

type CategoryWithJobs = Category & {
    jobs: Job[];
};



const Navbar = async () => {
    const sesssion = await auth()
    const user = sesssion?.user


    let categories: CategoryWithJobs[] = []
    try {
        categories = await db.category.findMany({
            include: {
                jobs: true
            }
        })
    } catch (error) {
        console.log(error)
    }




    return (
        <div>
            <div className="flex justify-between items-center py-2 ">
                <div className="flex items-center">
                    <div className="flex items-center  ">

                        <div className="logo">
                            <Link href={"/"}>
                                <Image priority height={60} width={60} src={logo} className='rounded-full' alt='logo' />
                            </Link>
                        </div>
                        <div className="menu">




                            <BrowsCategoryItems categories={categories} />




                        </div>
                    </div>
                    <div className="w-[0.5px] h-[25px] bg-gradient-to-t from-[#A64374] to-[#E87834] hidden sm:block"></div>

                    <div className="hidden sm:block">
                        <UserItemsProps />
                    </div>

                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex">
                        <ButtonPlus icon={LayoutDashboardIcon} title='Dashboard' link='/dashboard/recruiter' />
                    </div>
                    <div className=" sm:block hidden">
                        <ModeToggle />
                    </div>

                    <DropdownMenu>
                        <ProfileTrigger user={user!} />
                    </DropdownMenu>

                </div>
            </div>
            {/* Bottom Navbar */}
            <BottomNavbar />
        </div>
    )
}

export default Navbar