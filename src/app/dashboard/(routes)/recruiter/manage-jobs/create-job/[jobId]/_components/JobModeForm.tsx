"use client"
import { Edit, LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Job } from '@prisma/client'
import ComboBox from '@/components/ui/combo-box'

interface propsTypes {
    jobId: string,
    intialJob: Job,
    options: { label: string, value: string }[]
}

const options=[
    {
        label:"Onsite",
        value:"Onsite"
    },
    {
        label:"Remote",
        value:"Remote"
    },
    {
        label:"Hybrid",
        value:"Hybrid"
    },
   
]

const formSchema = z.object({
    workMode: z.string().min(1, {
        message: "Category must be at least 5 characters.",
    }),
})

const JobModeForm = ({ jobId, intialJob }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            workMode: intialJob.workMode || ""
        }
    })
    const { isSubmitting, isValid } = form.formState
    const router = useRouter()


    const onSubmit = async (value: z.infer<typeof formSchema>) => {

        try {
            const jobdata = await axios.patch(`/api/jobs/${jobId}`, value);

            toast("Job updated successfully")
            setEditing(!editing)

            router.refresh()

        } catch (error) {
            console.error("Error creating job:", error);
        }
    };

    const selectedOption = options.find((option) => option.value === intialJob.workMode)

    
    return (
        <div className='border px-2 pb-4 mt-3'>
            <div className="flex justify-between items-center py-4">
                <p>Work mode</p>
                <div onClick={() => setEditing(!editing)} className='cursor-pointer'>
                    {
                        editing ? "Cancel" : <div className="flex items-center gap-2">
                            Edit
                            <Edit />
                        </div>
                    }

                </div>
            </div>
            {
                editing && <div className="">
                    {/* form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="workMode"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <ComboBox heading={"category"} options={options}  {...field} />

                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                isSubmitting ? (
                                    <Button disabled>
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button disabled={isSubmitting || !isValid} variant="outline" type="submit">
                                        Save
                                    </Button>
                                )
                            }
                        </form>
                    </Form>
                </div>
            }
            {
                !editing && <p>{selectedOption?.label || "No work mode"}</p>
            }
        </div>
    )
}

export default JobModeForm