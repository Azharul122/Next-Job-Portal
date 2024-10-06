"use client"

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


type jobActionProps = {
    isPublished: boolean,
    jobId: string,
    disabled: boolean
}

const JobPublishAction = ({ isPublished, jobId, disabled }: jobActionProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const handlePublish = async () => {

        try {
            setIsLoading(true)

            if (isPublished) {
                await axios.patch(`/api/jobs/${jobId}/unpublish`)
                toast.success("Job unpublish")
                setIsLoading(false)
            } else {

                await axios.patch(`/api/jobs/${jobId}/publish`)
                toast.success("Job published")
                setIsLoading(false)

            }
            router.refresh()
        } catch (error) {
            console.log(error)

        }
    }

    const [loading, setLoading] = useState(false)
    const [isDialogOpen, setDialogOpen] = useState(false);


    const handleDelte = async () => {


        setDialogOpen(true)





    }

    const confirmDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/jobs/${jobId}`)
            toast.success("Job deleted")
            router.refresh()
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
            setDialogOpen(false)
        }
    }
    return (
        <div className="flex items-center gap-2">

            <Button variant={"ghost"} onClick={handlePublish} disabled={isLoading} className={`${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}${isPublished ? "bg-green-400" : "bg-red-400"}   py-1 px-3 rounded text-sm`}> {isLoading ? <span className="flex gap-2 items-center"><Loader2 className='animate-spin' /> {isPublished ? "Unpublishing" : "Publishing"}</span> : <div className="">{isPublished ? "Unpublish" : "Publish"}</div>}  </Button>
            <button disabled={loading} onClick={handleDelte}>
                {loading ? <span className="flex gap-2 items-center"><Loader2 className='animate-spin' /> Deleting </span> : <Trash className='text-red-600 cursor-pointer' />}
            </button>

            <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialogOpen(true)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className='text-gradient-start'>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default JobPublishAction