"use client"

import React, { useState } from 'react'
import UserNavabarLinkItems from './UserNavabarLinkItems'


const UserItemsProps = () => {
    const [show,setShow]=useState(false)
  return (
    <UserNavabarLinkItems setShow={setShow}/> 
    
  )
}

export default UserItemsProps