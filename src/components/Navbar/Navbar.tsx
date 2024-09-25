
import React from 'react'
import logo from "@/images/logo.png"

import Image from 'next/image'
import Link from 'next/link'
// import defaultUser from "@/../public/default-user.png"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { FaBeer, FaCross, FaHome, FaReact, FaTimes, FaUser, FaUserCircle } from 'react-icons/fa';
// import { Button } from '../ui/button'
// import { useTheme } from 'next-themes'
import { ModeToggle } from './DarkMode'
// import { getSession } from '@/lib/getSession'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
import { auth } from '@/auth'
import UserNavabarLinkItems from './UserNavabarLinkItems'
// import { MenuIcon, UserCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import ProfileMenuItems from './ProfileMenuItems'
import BottomNavbar from './BottomNavbar'
// import { useRouter } from 'next/router'
// import { LoaderCircle } from 'lucide-react'


const Navbar = async () => {
    const sesssion = await auth()
    // console.log(sesssion)
    // const { data, status } = useSession()
    // if (status === "loading") {
    //     return <div className="h-screen w-full flex justify-start items-center">loading</div>
    // }
    const user = sesssion?.user

    // if(!sesssion?.user) return <LoaderCircle/>

    // const sesssion=getSession()

    // const { setTheme } = useTheme()
    // const isSignedIn = false

    // if(isLoaded){
    //     return <p>Loading</p>
    // }



    // const getLinkClasses = (path):string => {
    //     "use client"
    //     const router=()
    //     return `px-4 py-2 text-sm rounded ${router.pathname === path ? 'active:text-red-300 active:font-extrabold' : ''}`;
    //   };

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

                            <NavigationMenu >
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
                    {/* <div className="menuItems">
                        <Link className={`px-4 py-2 text-sm dark:hover:bg-black rounded `} href={"/"}>Home</Link>
                        <Link className='px-4 py-2 text-sm  rounded' href={"/slider"}>Slider</Link>
                        <Link className='px-4 py-2 text-sm  rounded' href={"/jobs"}>Jobs</Link>
                    </div> */}
                    <div className="hidden sm:block">
                        <UserNavabarLinkItems setShow={""}/>
                    </div>

                </div>

                <div className="flex items-center gap-2">
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