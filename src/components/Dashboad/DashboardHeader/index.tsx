

import React from 'react'
import Profile from './Profile'

import Logo from '@/components/Navbar/Logo'
import Link from 'next/link'

const DashboardHeader = () => {

    return (
        <>
            <div className="flex justify-between items-center py-5 px-10">
                {/* Logo */}
                <Logo />
                {/* Profile */}
                <div className="flex items-center justify-between gap-5">
                    <Link href="#_" className="relative px-5 py-2 font-medium text-white group">
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-start group-hover:bg-gradient-end group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-gradient-end group-hover:bg-gradient-start group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-orange-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-orange-400 -rotate-12"></span>
                        <span className="relative">Recruiter view</span>
                    </Link>

        
                    <Profile />
                </div>

            </div>
        </>
    )
}

export default DashboardHeader