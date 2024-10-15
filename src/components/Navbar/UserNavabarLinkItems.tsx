"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropsTypes {
    setShow: (show: boolean) => void; 
}

const UserNavabarLinkItems = ({ setShow }: PropsTypes) => {
    const pathname = usePathname();

    const handleShow = () => {
        setShow(false);
    };

    const isActive = (path: string) => { 
        return pathname === path && pathname.startsWith(path);
    };

    return (
        <div className="menuItems divide-y divide-gradient-start sm:divide-y-0 flex flex-col md:flex-row">
            <button className="!px-4 !py-2" onClick={handleShow}>
                <Link
                    className={`w-full h-full text-sm dark:hover:bg-black ${isActive('/') ? 'font-extrabold gradient-text' : ''} rounded`}
                    href="/"
                >
                    Home
                </Link>
            </button>
            <button onClick={handleShow} className="px-4 py-2">
                <Link
                    className={`px-4 py-2 text-sm rounded ${isActive('/slider') ? 'font-extrabold gradient-text' : ''}`}
                    href="/slider"
                >
                    Slider
                </Link>
            </button>
            <button onClick={handleShow} className="px-4 py-2">
                <Link
                    className={`px-4 py-2 text-sm rounded ${isActive('/jobs') ? 'font-extrabold gradient-text' : ''}`}
                    href="/jobs"
                >
                    Jobs
                </Link>
            </button>
        </div>
    );
}

export default UserNavabarLinkItems;
