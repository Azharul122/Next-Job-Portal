import { auth } from '@/auth'
import ProfileMenuItems from '@/components/Navbar/ProfileMenuItems'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'


import React from 'react'
import { FaUser } from 'react-icons/fa'

const Profile = async () => {
    const session = await auth()
    const user =  session?.user
    
   
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="profile">
                        {
                            <div className="">
                                {
                                  user &&  user.avatar ? <Image src={user.avatar} className='rounded-full' height={30} width={30} alt='insert' /> : <div className="bg-gradient-custom rounded-full p-[6px]">
                                    <FaUser className=' text-xl text-[#f76845] z-30' />
                                </div>
                                }
                            </div>
                        }

                    </div>
                </DropdownMenuTrigger>
                {
                    user && <ProfileMenuItems />
                }
            </DropdownMenu>
        </>
    )
}

export default Profile