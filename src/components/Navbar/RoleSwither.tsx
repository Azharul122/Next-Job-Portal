// import { Link } from 'lucide-react'
"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const RoleSwither = () => {
    const isRouter=usePathname().startsWith("/dashboard/admin")
    return (
        <Link href={isRouter?"/dashboard/recruiter":"/dashboard/admin"} className="relative px-5 py-1 font-medium text-white group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-start group-hover:bg-gradient-end group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-gradient-end group-hover:bg-gradient-start group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-orange-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-orange-400 -rotate-12"></span>
            <span className="relative">{isRouter?"Recruiter view":"Admin view"}</span>
        </Link>
    )
}

export default RoleSwither