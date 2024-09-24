"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const UserNavabarLinkItems = ({ setShow }) => {
    const pathname = usePathname();
    const handleSow = () => {
        // e.preventDefault()
        if (typeof setShow === 'function') {
            setShow(false)
        }

    }
    // const [show,setShow]=useState(false)

    const isActive = (path) => {
        return pathname === path && pathname.startsWith(path);
    };
    return (
        <div className="menuItems divide-y divide-gradient-start sm:divide-y-0 flex flex-col md:flex-row">
            <button className="!px-4 !py-2 " onClick={handleSow}>
                <Link
                    className={` w-full h-full  text-sm dark:hover:bg-black ${isActive('/') ? 'font-extrabold gradient-text' : ''} rounded`}
                    href="/"
                // 
                >
                    Home
                </Link>
            </button>
            <button onClick={handleSow} className="px-4 py-2">
                <Link
                    className={`px-4 py-2 text-sm rounded ${isActive('/slider') ? 'font-extrabold gradient-text' : ''}`}
                    href="slider"
                // onClick={() => setShow(false)}
                >
                    Slider
                </Link>
            </button>
            <button onClick={handleSow} className="px-4 py-2">
                <Link
                    className={`px-4 py-2 text-sm rounded ${isActive('/jobs') ? 'font-extrabold gradient-text' : ''}`}
                    href="jobs"
                // onClick={() => setShow(false)}
                >
                    Jobs
                </Link>
            </button>


        </div>
    )
}

export default UserNavabarLinkItems