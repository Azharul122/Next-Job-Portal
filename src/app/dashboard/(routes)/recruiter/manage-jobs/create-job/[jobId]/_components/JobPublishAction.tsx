"use client"

import { Trash } from 'lucide-react'
import React, { useState } from 'react'

type jobActionProps = {
    isPublished: boolean,
    jobId:string,
    disabled:boolean
}

const JobPublishAction = ({ isPublished,jobId,disabled }: jobActionProps) => {
    const [isLoading,setIsLoading]=useState(false)
    const handlePublish=()=>{
        
    }
    const handleDelte=()=>{

    }
    return (
        <div className="flex items-center gap-2">
            <button onClick={handlePublish} disabled={disabled || isLoading} className={`${disabled?"cursor-not-allowed opacity-60":"cursor-pointer"} bg-green-400 py-1 px-3 rounded text-sm`}>{!isPublished?"Publish":"Unpublish"}</button> 
            <button disabled={isLoading} onClick={handleDelte}><Trash  className='text-red-600 cursor-pointer' /></button>
        </div>
    )
}

export default JobPublishAction