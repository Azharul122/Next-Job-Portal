import { LoaderCircle, LoaderIcon } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-blend-darken z-50">
            <LoaderIcon height={50} width={50} color='#A64374' />
        </div>
    )
}

export default Loading