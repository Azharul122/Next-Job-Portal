"use client"
import { Copy, Edit, Globe2Icon, Lightbulb, LinkedinIcon, Loader2, LoaderCircle, Mail, MapIcon, Repeat2 } from 'lucide-react'
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
import ComboBox from '@/components/ui/combo-box'
import { Textarea } from '@/components/ui/textarea'
import getGenerativeAIResponse from '../../../../../../../../../Scripts/GoogleApi'
import Editor from '@/components/ui/editor'
import Preview from '@/components/ui/Preview'
import Link from 'next/link'

interface propsTypes {
    companyId: string,
    intialComapny: Company,
    isRequired: boolean
}

const formSchema = z.object({
    website: z.string().min(1, {
        message: "Website must be at least 100 characters.",
    }),
    socialLink: z.string().min(1, {
        message: "socialLink must be at least 100 characters.",
    }),
    address_line1: z.string().min(1, {
        message: "address_line1 must be at least 100 characters.",
    }),
    address_line2: z.string().min(1, {
        message: "address_line2 must be at least 100 characters.",
    }),
    city: z.string().min(1, {
        message: "City must be at least 100 characters.",
    }),
    zip_code: z.string().min(1, {
        message: "ZIP code must be at least 100 characters.",
    }),

    mail: z.string().min(1, {
        message: "Mail must be at least 100 characters.",
    }),
})

const CompanySocialLinks = ({ companyId, intialComapny, isRequired }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    // const [aiData, setAiData] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mail: intialComapny.mail || "",
            address_line1: intialComapny.address_line1 || "",
            address_line2: intialComapny.address_line2 || "",
            city: intialComapny.city || "",
            socialLink: intialComapny.socialLink || "",
            zip_code: intialComapny.zip_code || "",
            website: intialComapny.website || ""

        }
    })
    const { isSubmitting, isValid } = form.formState
    const [prompt, setPrompt] = useState("")
    const [isPrompting, setIsPrompting] = useState(false)
    const [geminiData, setGeminiData] = useState("")
    const router = useRouter()

    // console.log(options)

    const onSubmit = async (value: z.infer<typeof formSchema>) => {

        try {
            const jobdata = await axios.patch(`/api/companies/${companyId}`, value);

            toast("Job updated successfully")
            setEditing(!editing)

            router.refresh()

        } catch (error) {
            console.error("Error creating job:", error);
            // Optionally display an error message to the user
        }
    };




    return (
        <div className='border px-2 pb-4 mt-3 bg-[#f8f8f8] dark:bg-[#000B1F]'>
            <div className="flex justify-between items-center py-4 text-lg">
                <p>Company social Links <sup className={`${isRequired ? "text-red-500" : "hidden"}`}>*</sup></p>
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
                                name="mail"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>


                                            <Input disabled={isSubmitting} placeholder=" e.g. example@mail.com " {...field} />


                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>


                                            <Input disabled={isSubmitting} placeholder=" e.g. example.com " {...field} />


                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="socialLink"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>


                                            <Input disabled={isSubmitting} placeholder=" Social Link " {...field} />


                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="address_line1"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>


                                                <Input disabled={isSubmitting} placeholder=" Address Line 1 " {...field} />


                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address_line2"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>


                                                <Input disabled={isSubmitting} placeholder=" Addresss Line 2 " {...field} />


                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>


                                                <Input disabled={isSubmitting} placeholder=" City " {...field} />


                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="zip_code"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>


                                                <Input disabled={isSubmitting} placeholder=" ZIP code " {...field} />


                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>


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
                !editing && (<div className='text-sm '>
                    {
                        intialComapny.website ? (
                            <div className="flex flex-col gap-2 justify-center">
                                <div className="flex items-center gap-2">
                                    <Globe2Icon />
                                    {intialComapny.website}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail />
                                    {intialComapny.mail}
                                </div>

                                <div className="flex items-center gap-2">
                                    <LinkedinIcon />
                                    <Link href={intialComapny.socialLink}>Linkedin link</Link>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapIcon />
                                    <div className="">
                                        {intialComapny.address_line1}, {intialComapny.address_line2}, {intialComapny.city}, {intialComapny.zip_code}
                                    </div>
                                </div>

                            </div>
                        ) : "No company descrition"
                    }
                </div>)
            }
        </div>
    )
}

export default CompanySocialLinks