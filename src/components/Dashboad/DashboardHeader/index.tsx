
import React from 'react'
import Profile from './Profile'
import Logo from '@/components/Navbar/Logo'
import RoleSwither from '@/components/Navbar/RoleSwither'

const DashboardHeader = () => {

    return (
        <>
            <div className="flex justify-between items-center py-5 px-10">
                {/* Logo */}
                <Logo />
                {/* Profile */}
                <div className="flex items-center justify-between gap-5">
                    <RoleSwither/>

        
                    <Profile />
                </div>

            </div>
        </>
    )
}

export default DashboardHeader