"use client"
import { useState } from 'react';
import ProfileMenuItems from './ProfileMenuItems';
import { DropdownMenuTrigger } from '../ui/dropdown-menu';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { SessionUserProfile } from '@/auth';

interface propsTypes {
    user: SessionUserProfile,
}

const ProfileTrigger = ({ user }: propsTypes) => {
    const [show, setShow] = useState(true)
    console.log(show)
    return (
        <>
            <DropdownMenuTrigger>
                <>
                    {
                        user ? <div className="" onClick={() => setShow(true)}>
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

                </>
            </DropdownMenuTrigger>
            {
                user && <ProfileMenuItems show={show} setShow={setShow} />
            }
        </>
    )
}

export default ProfileTrigger