import { auth } from '@/auth'
import BreadCrumb from '@/components/ui/custom-breadceumb'
import { redirect } from 'next/navigation'
import React from 'react'

const UserProfile = async() => {
    const sesssion=await auth()
    const user=sesssion?.user

    if(!user){
        redirect("/sign-in")
    }

  return (
    <div>
        <BreadCrumb  breaderCrumbPage='user-profile'/>

        {/* Profile */}
        

        
    </div>
  )
}

export default UserProfile