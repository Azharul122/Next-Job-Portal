"use client"
import { Edit, ImageIcon, LoaderCircle } from 'lucide-react'
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
import { Company, Job } from '@prisma/client'
import Image from 'next/image'
import ImageUploadToFirebase from '@/components/ui/image-upload'
import { url } from 'inspector'

interface propsTypes {
    companyId: string,
    initialCompany: Company
}

const formSchema = z.object({
    logo: z.string().min(1, "Required"),
})

const CompanyLogo = ({ companyId, initialCompany }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            logo: initialCompany?.logo || ""
        }
    })
    const { isSubmitting, isValid } = form.formState
    const router = useRouter()

    const onSubmit = async (value: z.infer<typeof formSchema>) => {

        try {
            const jobdata = await axios.patch(`/api/companies/${companyId}`, value);

            toast("Image updated successfully")
            setEditing(!editing)

            router.refresh()

        } catch (error) {
            console.error("Error creating job:", error);
            // Optionally display an error message to the user
        }
    };
    return (
        <div className='border px-2 pb-4 mt-3 bg-lightbg dark:bg-darkbg'>
            <div className="flex justify-between items-center py-4 text-lg">
                <p>Comapny logo</p>
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
                                name="logo"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            {/* <Input disabled={isSubmitting} placeholder="Update Title" {...field} /> */}
                                            <ImageUploadToFirebase disabled={isSubmitting} onRemove={() => field.onChange("")} onChange={(url) => field.onChange(url)} value={field.value} />
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
                !editing && (
                    !initialCompany?.logo ? <div className="h-60 flex items-center justify-center">
                        <ImageIcon className='size-10' />
                    </div> : <div className="relative aspect-video mt-2">
                        <Image src={initialCompany?.logo} className='size-full' fill alt='Image' />
                    </div>
                )
            }
        </div>
    )
}

export default CompanyLogo