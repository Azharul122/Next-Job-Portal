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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import axios from "axios"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { Job } from '@prisma/client'

interface propsTypes {
    jobId: string,
    intialJob: Job
}

const formSchema = z.object({
    hourlyRate: z.string().min(1, {
        message: "Rate must.",
    }),
})

const HourlyRateForm = ({ jobId, intialJob }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { hourlyRate: intialJob.hourlyRate || "" }
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
            // Optionally display an error message to the user
        }
    };
    return (
        <div className='border px-2 pb-4 mt-3'>
            <div className="flex justify-between items-center py-4">
                <p>Hourly Rate</p>
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
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="Update Hourly Rate" {...field} />
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
                !editing && <p>{`$${intialJob.hourlyRate}/h`}</p>
            }
        </div>
    )
}

export default HourlyRateForm