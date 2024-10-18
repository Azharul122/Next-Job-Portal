"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { Resumes, UserProfile } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ModalProps {

    isOpen: boolean,
    onClose: () => void,
    isConfirm: () => void,
    loading: boolean,
    userProfile: (UserProfile & { resumes: Resumes[] }) | null
}

const ApplyModal = ({ isOpen, onClose, isConfirm, userProfile }: ModalProps) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }


    return (
        <Modal title="Are you sure?" description="Make sure you are ready to apply!"
            onClose={onClose}
            isOpen={isOpen}

        >
            <div className="grid grid-cols-2  gap-3">

                <p className="py-3 px-4 border dark:border-dark-border border-light-border">{userProfile?.fullName}</p>

                <p className="py-3 px-4 border dark:border-dark-border border-light-border">{userProfile?.contact}</p>

                <p className="col-span-2 py-3 px-4 border dark:border-dark-border border-light-border">{userProfile?.email}</p>

                <p className="col-span-2 py-3 px-4 border dark:border-dark-border border-light-border truncate text-xs"><span className="font-bold text-sm">Active resume: </span>{userProfile?.resumes.find((resume) => resume.id === userProfile.ActiveResumeId)?.name}</p>

                <div className="flex items-center gap-2 col-span-2 text-sm">
                <p>Need to update information </p> <Link className="text-gradient-end" href={"/user-profile"}>Click here</Link>
                </div>

                <div className="flex justify-end items-center gap-3 col-span-2 py-2">
                    <Button variant={"outline"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={"outline"} 
                    onClick={isConfirm}
                    className="bg-gradient-start">
                        Continue
                    </Button>
                </div>

            </div>
        </Modal>
    )
}

export default ApplyModal