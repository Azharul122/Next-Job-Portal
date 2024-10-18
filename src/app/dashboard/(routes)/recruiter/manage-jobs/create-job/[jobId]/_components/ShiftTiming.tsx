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

const formSchema = z.object({
    shiftTimimg: z.string().min(1, {
        message: "Shift timing is required.",
    }),
})

const ShiftTiming = ({ jobId, intialJob, options }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            shiftTimimg: intialJob.shiftTimimg || ""
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

    const selectedOption = options.find((option) => option.value === intialJob.shiftTimimg)

    console.log(selectedOption)
    return (
        <div className='border px-2 pb-4 mt-3'>
            <div className="flex justify-between items-center py-4">
                <p>Shift timing</p>
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
                                name="shiftTimimg"
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
                                        Submit
                                    </Button>
                                )
                            }
                        </form>
                    </Form>
                </div>
            }
            {
                !editing && <p>{selectedOption?.label || "No Shift Timing"}</p>
            }
        </div>
    )
}

export default ShiftTiming