"use client"
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent } from '../ui/dropdown-menu'
import { BookIcon, BookMarkedIcon, Settings, User } from 'lucide-react'
import Link from 'next/link'
import SignOutForm from './SignOutForm'
import { useRouter } from 'next/navigation'
import { BsBagFill } from "react-icons/bs";
// import { useRouter } from 'next/router'

// interface propsTypes {
//     show?: boolean
//     setShow?: (value: boolean) => void
// }
// { show, setShow }: propsTypes

const ProfileMenuItems = () => {
    const router = useRouter()


    return (
        <div className="">
            {
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => router.push("/user-profile")}>
                            <User className="mr-2 h-4 w-4" />
                            <h2 >Profile</h2>
                            
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => router.push("/jobs/applied-jobs")}>
                            <BsBagFill className="mr-2 h-4 w-4" />
                            <h2>Applied jobs</h2>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => router.push("/user-profile/followed-companies")}>
                            <BookIcon className="mr-2 h-4 w-4" />
                            <h2 >Followed companies</h2>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => router.push("/jobs/saved-jobs")}>
                            <BookMarkedIcon className="mr-2 h-4 w-4" />
                            <h2 >Saved jobs</h2>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => router.push("/settings")}>
                            <Settings className="mr-2 h-4 w-4" />
                            <h2 >Settings</h2>
                        </DropdownMenuItem>

                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem >

                        <SignOutForm />

                    </DropdownMenuItem>
                </DropdownMenuContent>
            }
        </div>
    )
}

export default ProfileMenuItems