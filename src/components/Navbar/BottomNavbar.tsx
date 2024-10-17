"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ModeToggle } from './DarkMode';
import { FaHome, FaTimes } from 'react-icons/fa';
import { MenuIcon } from 'lucide-react';
import UserNavabarLinkItems from './UserNavabarLinkItems';
import Link from 'next/link';

const BottomNavbar = () => {
    const [show, setShow] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
        const handleHideMenu = (event: MouseEvent) => { 
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleHideMenu);
        return () => {
            document.removeEventListener("mousedown", handleHideMenu);
        };
    }, []);

    return (
        <>
            {/* UserNavabarLinkItems Menu */}
            {show  && (
                <div ref={menuRef} className={`fixed bottom-16 right-4 z-50 border-2 md:border-0`}>
                    <UserNavabarLinkItems setShow={setShow} />
                </div>
            )}
            {/* Backdrop when menu is open */}
            {show && (
                <div className="fixed inset-0 backdrop-blur-sm z-10"></div>
            )}
            {/* Bottom Navbar */}
            <div className={`dark:border-t-gradient-start border-t-[1px] ${show ? "blur-sm" : ""} dark:bg-transparentBGprimary bg-transparentBGDarkprimary px-5 fixed bottom-0 left-0 z-30 w-full block sm:hidden overflow-x-hidden shadow-xl`}>
                <div className="flex justify-between items-center w-full">
                    {/* Dark mode toggle */}
                    <ModeToggle />
                    {/* Home */}
                    <Link passHref href={"/"} className='border bg-gradient-custom h-full rounded-tl-full rounded-tr-full'>
                        <button className="border px-4 py-3 ">
                            <FaHome className='text-xl' />
                        </button>
                    </Link>
                    {/* Menu Icon */}
                    <MenuIcon className={`${show ? "hidden" : "block"}`} onClick={() => setShow(true)} />
                    {/* Close Icon */}
                    <FaTimes tabIndex={0} className={`${show ? "block" : "hidden"} text-xl`} onClick={() => setShow(false)} />
                </div>
            </div>
        </>
    );
}

export default BottomNavbar;
