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
import { Company } from '@prisma/client'
import { Textarea } from '@/components/ui/textarea'


interface propsTypes {
    companyId: string,
    intialComapny: Company,
    isRequired: boolean
}

const formSchema = z.object({
    description: z.string().min(100, {
        message: "Description must be at least 100 characters.",
    }),
})

const CompanyDescription = ({ companyId, intialComapny, isRequired }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: intialComapny.description || ""
        }
    })
    const { isSubmitting, isValid } = form.formState
    const router = useRouter()


    const onSubmit = async (value: z.infer<typeof formSchema>) => {

        try {
            const jobdata = await axios.patch(`/api/companies/${companyId}`, value);

            toast("Job updated successfully")
            setEditing(!editing)

            router.refresh()

        } catch (error) {
            console.error("Error creating job:", error);
        }
    };




    return (
        <div className='border px-2 pb-4 mt-3 bg-[#f8f8f8] dark:bg-[#000B1F]'>
            <div className="flex justify-between items-center py-4 text-lg">
                <p>Description <sup className={`${isRequired ? "text-red-500" : "hidden"}`}>*</sup></p>
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
                editing && <div className="text-sm">

                    <div className="flex items-center justify-between">
                        <p className='py-2 text-sm'>Note: SD must be professional</p>

                    </div>

                    {/* form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>


                                            <Textarea disabled={isSubmitting} placeholder=" Sort description " {...field} />


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
                                    <Button disabled={isSubmitting || !isValid} variant="outline"
                                        type="submit" className='disabled:bg-opacity-15 disabled:cursor-not-allowed'>
                                        Save
                                    </Button>
                                )
                            }
                        </form>
                    </Form>

                </div>
            }
            {
                !editing && (<div className='text-sm'>
                    {
                        intialComapny.description ? intialComapny.description : "No company descrition"
                    }
                </div>)
            }
        </div>
    )
}

export default CompanyDescription