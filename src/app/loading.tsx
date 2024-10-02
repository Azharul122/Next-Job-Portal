import { LoaderCircle, LoaderIcon } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen dark:bg-darkbg bg-lightbg z-50 fixed top-0 left-0 overflow-hidden">
            <LoaderIcon height={50} width={50} color='#A64374' className='animate-spin'/>
        </div>
    )
}

export default Loading