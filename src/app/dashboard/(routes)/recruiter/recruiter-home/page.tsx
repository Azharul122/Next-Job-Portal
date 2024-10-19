import { Separator } from '@/components/ui/separator'
import React from 'react'

const RecruiterHome = () => {
    return (
        <div>
            <h2 className='pb-4'>Recruiter Dashboard</h2>
            <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border bg-slate-800 backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total jobs</p>
                    <p className='text-2xl'>50</p>
                </div>
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border bg-slate-800 backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total jobs</p>
                    <p className='text-2xl'>50</p>
                </div>
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border bg-slate-800 backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total jobs</p>
                    <p className='text-2xl'>50</p>
                </div>
                <div className="flex flex-col gap-3 border-2 dark:border-slate-700 border-light-border bg-slate-800 backdrop-blur-xl shadow-xl px-3 py-2 items-center rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total jobs</p>
                    <p className='text-2xl'>50</p>
                </div>

            </div>
            <Separator className='my-4' />

            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-4 border-2 dark:border-slate-700 border-light-border bg-slate-800 backdrop-blur-xl shadow-xl px-3 py-2  rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total jobs</p>
                    <p className='text-2xl'>50</p>
                </div>
                <div className="flex flex-col gap-4 border-2 dark:border-slate-700 border-light-border bg-slate-800 backdrop-blur-xl shadow-xl px-3 py-2  rounded">
                    <p className='text-sm dark:text-muted-foreground '>Total jobs</p>
                    <p className='text-2xl'>50</p>
                </div>
            </div>
        </div>
    )
}

export default RecruiterHome