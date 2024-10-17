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

import { Input } from "@/components/ui/input"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface propsTypes {
    companyId: string,
    intialCompany: {
        companyTitle: string

    }
}

const formSchema = z.object({
    companyTitle: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
})

const CompanyTitleForm = ({ companyId, intialCompany }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: intialCompany
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
        <div className='border px-2 pb-4 mt-3 dark:bg-[#000B1F] bg-[#F8F8F8]'>
            <div className="flex justify-between items-center py-4">
                <p className='text-lg'>Company Title</p>
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
                    {/* form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="companyTitle"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="Update Title" {...field} />
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
                !editing && <p className='text-sm'>{intialCompany.companyTitle}</p>
            }
        </div>
    )
}

export default CompanyTitleForm