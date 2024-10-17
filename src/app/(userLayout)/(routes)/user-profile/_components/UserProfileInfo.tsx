"use client"

import { SessionUserProfile } from '@/auth'
import { UserProfile } from '@prisma/client'
import { Edit } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface propsTypes {
    user: SessionUserProfile,
    profile: UserProfile | null
}

const UserProfileInfo = ({ user, profile }: propsTypes) => {
    const [hover, setHover] = useState(false)
    return (
        <>
            <p className='py-3'>Welcome back <span className='gradient-text'>{profile?.fullName || user.name}</span></p>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="w-[110px] h-[110px] flex justify-center items-center backdrop-blur-xl border-gray-500/20 border-2 rounded-full relative">
                <Image src={user?.avatar ? user.avatar : ""} className='rounded-full' alt="" height={100} width={100} />
                {
                    hover && (
                        <div className="absolute rounded-full inset-0 bg-transparentBGprimary flex items-center justify-center">
                            <Edit className='' />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default UserProfileInfo