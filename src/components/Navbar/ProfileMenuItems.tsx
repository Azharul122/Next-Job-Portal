import React from 'react'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent } from '../ui/dropdown-menu'
import { CreditCard, LogOut, Mail, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users } from 'lucide-react'
import { DropdownMenuSub, DropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu'

const ProfileMenuItems = () => {
    return (
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>

                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>

                </DropdownMenuItem>

            </DropdownMenuGroup>




            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>

            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

export default ProfileMenuItems