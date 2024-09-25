"use client"

import Image from 'next/image'
import Link from 'next/link'
import logo from "@/images/logo.png"
import { usePathname } from 'next/navigation'

const Logo = () => {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith("/dashboard/admin")
    // const isRecruiter = pathname.startsWith("/dashboard/recruiter")
    return (
        <>
            <Link href={isAdmin ? "/dashboard/admin" : "/dashboard/recruiter"}>
                <Image height={60} width={60} src={logo} alt='Add logo' />
            </Link>
        </>
    )
}

export default Logo