
import logo from "@/images/logo.png"

import Image from 'next/image'
import Link from 'next/link'
// import defaultUser from "@/../public/default-user.png"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { FaUser } from 'react-icons/fa';
import { ModeToggle } from './DarkMode'
import { auth } from '@/auth'
import UserNavabarLinkItems from './UserNavabarLinkItems'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import ProfileMenuItems from './ProfileMenuItems'
import BottomNavbar from './BottomNavbar'
import ButtonPlus from './ButtonPlus'
import { LayoutDashboardIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import UserItemsProps from "./UserItemsProps";


const Navbar = async () => {
    const sesssion = await auth()
    const user = sesssion?.user

   
  

    return (
        <div>
            <div className="flex justify-between items-center py-2 ">
                <div className="flex items-center">
                    <div className="flex items-center  ">

                        <div className="logo">
                            <Link href={"/"}>
                                <Image priority  height={60} width={60} src={logo} className='rounded-full' alt='logo' />
                            </Link>
                        </div>
                        <div className="menu">

                            <NavigationMenu className={cn("focus:outline-none focus:ring-0 border-none")}>
                                <NavigationMenuList className=''>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Job category</NavigationMenuTrigger>
                                        <NavigationMenuContent className='p-2 md:p-5 w-[190px] xs:w-[250px] sm:w-[300px]  md:!w-[440px] grid md:grid-cols-3 grid-cols-1 gap-2 '>
                                            <NavigationMenuLink> <Link href='/dashboard' className='flex gap-1 items-center border p-2  rounded-md hover:scale-100 transition-all  hover:justify-center overflow-hidden hover:bg-black hover:text-white '><p>Image</p> <p>User</p></Link> </NavigationMenuLink>
                                            <NavigationMenuLink> <Link href='/dashboard/admin' className='flex gap-1 items-center border p-2 rounded-md hover:scale-100 transition-all  hover:justify-center overflow-hidden hover:bg-black hover:text-white text-sm md:text-lg'><p>Image</p> <p>Admin</p></Link> </NavigationMenuLink>
                                            <NavigationMenuLink> <Link href='/dashboard/recruiter' className='flex gap-1 items-center border p-2 rounded-md hover:scale-100 transition-all  hover:justify-center overflow-hidden hover:bg-black hover:text-white text-sm md:text-lg'><p>image</p> <p>Recruiter</p></Link> </NavigationMenuLink>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>



                                </NavigationMenuList>
                            </NavigationMenu>

                        </div>
                    </div>
                    <div className="w-[0.5px] h-[25px] bg-gradient-to-t from-[#A64374] to-[#E87834] hidden sm:block"></div>
                   
                    <div className="hidden sm:block">
                    <UserItemsProps/>
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
                            user && <ProfileMenuItems/>
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