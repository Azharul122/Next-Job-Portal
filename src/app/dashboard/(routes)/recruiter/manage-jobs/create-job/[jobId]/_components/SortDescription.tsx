"use client"
import { Edit, Lightbulb, Loader2, LoaderCircle, Repeat2 } from 'lucide-react'
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
import { Job } from '@prisma/client'
import { Textarea } from '@/components/ui/textarea'
import getGenerativeAIResponse from '../../../../../../../../../Scripts/GoogleApi'

interface propsTypes {
    jobId: string,
    intialJob: Job,
    isRequired: boolean
}

const formSchema = z.object({
    sort_description: z.string().min(10, {
        message: "Category must be at least 5 characters.",
    }),
})

const SortDescription = ({ jobId, intialJob, isRequired }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sort_description: intialJob.sort_description || ""
        }
    })
    const { isSubmitting, isValid } = form.formState
    const [prompt, setPrompt] = useState("")
    const [isPrompting, setIsPrompting] = useState(false)
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


    const handlePromptGenerate = async () => {

        try {
            setIsPrompting(true)
            const customPrompts = `could you suggest job sort descrition for ${prompt ? prompt : intialJob.title} within 100 words`

            await getGenerativeAIResponse(customPrompts).then((data) => {

                form.setValue("sort_description", data)
                setIsPrompting(false)
            })
        } catch (error) {

        }
    }


    return (
        <div className='border px-2 pb-4 mt-3'>
            <div className="flex justify-between items-center py-4">
                <p>Sort description <sup className={`${isRequired ? "text-red-500" : "hidden"}`}>*</sup></p>
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
                    <div className="flex gap-2 items-center">
                        <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Make with AI" className='w-full' />
                        {
                            isPrompting ? <>
                                <Button><Loader2 className='animate-spin' />Thinking ....</Button>
                            </> : <>
                                <Button onClick={handlePromptGenerate}>
                                    <Lightbulb size={20} className='animate-pulse' />
                                </Button>
                            </>
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <p className='py-2 text-sm'>Note: SD must be professional</p>
                        {
                            intialJob.sort_description && <Repeat2 onClick={() => handlePromptGenerate()} />
                        }
                    </div>
                    {/* form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="sort_description"
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
                !editing && <p className='truncate'>{intialJob?.sort_description || "No sort description"}</p>
            }
        </div>
    )
}

export default SortDescription