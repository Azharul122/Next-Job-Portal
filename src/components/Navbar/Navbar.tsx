
import logo from "@/images/logo.png"

import Image from 'next/image'
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { FaUser } from 'react-icons/fa';
import { ModeToggle } from './DarkMode'
import { auth } from '@/auth'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import ProfileMenuItems from './ProfileMenuItems'
import BottomNavbar from './BottomNavbar'
import ButtonPlus from './ButtonPlus'
import { LayoutDashboardIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import UserItemsProps from "./UserItemsProps";
import { BrowsCategoryItems } from "./BrowsCategoryItems";
import { db } from "@/lib/db";



const Navbar = async () => {
    const sesssion = await auth()
    const user = sesssion?.user


    const categories = await db.category.findMany({})

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

                            {/* <NavigationMenu className={cn("focus:outline-none focus:ring-0 border-none")}>
                                <NavigationMenuList className=''>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Job category</NavigationMenuTrigger>
                                        <NavigationMenuContent className=''>
                                          <NavigationMenuItem></NavigationMenuItem>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>



                                </NavigationMenuList>
                            </NavigationMenu> */}


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
                        <DropdownMenuTrigger>
                            <div className="profile">
                                {
                                    user ? <div className="">
                                        {
                                            user.avatar ? <Image src={user.avatar} className='rounded-full' height={30} width={30} alt='insert' /> : <div className="bg-gradient-custom rounded-full p-[6px]">
                                                <FaUser className=' text-xl text-[#f76845] z-30' />
                                            </div>
                                        }
                                    </div> : <div className="flex items-center divide-x border  py-2  shadow-sm rounded">
                                        <Link className='px-2 text-sm md:text-lg' href={"/sign-in"}>SignIn</Link>
                                        <Link className='px-2 hidden sm:block' href={"/sign-up"}>Sign Up</Link>
                                    </div>
                                }

                            </div>
                        </DropdownMenuTrigger>
                        {
                            user && <ProfileMenuItems />
                        }
                    </DropdownMenu>

                </div>
            </div>
            {/* Bottom Navbar */}
            <BottomNavbar />
        </div>
    )
}

export default Navbar