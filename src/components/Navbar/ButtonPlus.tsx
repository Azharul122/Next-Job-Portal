import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { LucideIcon } from 'lucide-react';

interface btnProps{
    link:string,
    title:string,
    icon:LucideIcon,
}
const ButtonPlus = ({link,title,icon:Icon}:btnProps) => {
  return (
    <Link href={link} className="relative inline-flex items-center justify-start py-[6px] pl-4 pr-12 overflow-hidden font-semibold bg-gradient-custom transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group text-sm">
    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-gradient-custom group-hover:h-full"></span>
    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
       <Icon className=' animate-pulse transition-all delay-200' size={20}/>
    </span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <Icon className=' animate-pulse transition-all delay-200 ' size={20}/>
        {/* <svg className="w-5 h-5 text-gradient-start" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> */}
    </span>
    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">{title}</span>
</Link>
  )
}

export default ButtonPlus