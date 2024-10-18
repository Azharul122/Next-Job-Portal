"use client"
import { Edit, LoaderCircle, X } from 'lucide-react'
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
import { UserProfile } from '@prisma/client'

interface propsTypes {
    userId: string,
    initialData: UserProfile | null,
   
}

const formSchema = z.object({
    contact: z.string().min(5, {
        message: "contact must be at least 5 characters.",
    }),
})

const UserContactForm = ({ userId, initialData }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        contact: initialData?.contact ||  "",
        }
    })
    const { isSubmitting, isValid } = form.formState
    const router = useRouter()

    const onSubmit = async (value: z.infer<typeof formSchema>) => {

        try {
            const jobdata = await axios.patch(`/api/users/${userId}`, value);

            toast("Job updated successfully")
            setEditing(!editing)

            router.refresh()

        } catch (error) {
            console.error("Error creating job:", error);
            
        }
    };
    return (
        <div className='border px-4 pb-4 mt-3 dark:border-dark-border border-light-border bg-lightbg dark:bg-darkbg'>
            <div className="flex justify-between items-center py-4">
                <p>Contact</p>
                <div onClick={() => setEditing(!editing)} className='cursor-pointer'>
                    {
                        editing ? <X className='size-5' /> : <div className="flex items-center gap-2">

                            <Edit className='size-5' />
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
                                name="contact"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="Update contact" {...field} />
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
                !editing && <p className='text-sm dark:text-muted-foreground text-neutral-500'>{initialData?.contact || "No contact information"}</p>
            }
        </div>
    )
}

export default UserContactForm