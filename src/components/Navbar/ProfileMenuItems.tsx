"use client"
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent } from '../ui/dropdown-menu'
import { BookIcon, BookMarkedIcon, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

interface propsTypes{
    show?:boolean
    setShow?:(value:boolean)=>void
}

const ProfileMenuItems = ({show,setShow}:propsTypes) => {
   
    return (
        <div className="">
            {
                show && <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setShow!(false)}>
                            <User className="mr-2 h-4 w-4" />
                            <Link href={"/user-profile"}>Profile</Link>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem onClick={() => setShow!(false)}>
                            <BookIcon className="mr-2 h-4 w-4" />
                            <Link href={"/jobs/applied-jobs"}>Applied jobs</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setShow!(false)}>
                            <BookIcon className="mr-2 h-4 w-4" />
                            <Link href={"/user-profile/followed-companies"}>Followed companies</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setShow!(false)}>
                            <BookMarkedIcon className="mr-2 h-4 w-4" />
                            <Link href={"/jobs/saved-jobs"}>Saved jobs</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setShow!(false)}>
                            <Settings className="mr-2 h-4 w-4" />
                            <Link href={"/settings"}>Settings</Link>
                        </DropdownMenuItem>

                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>

                    </DropdownMenuItem>
                </DropdownMenuContent>
            }
        </div>
    )
}

export default ProfileMenuItems