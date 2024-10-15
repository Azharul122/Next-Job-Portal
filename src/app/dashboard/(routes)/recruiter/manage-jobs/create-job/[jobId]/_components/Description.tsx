"use client"
import { Copy, Edit, Lightbulb, Loader2, LoaderCircle, Repeat2 } from 'lucide-react'
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
import { useRouter } from "next/navigation"
import { Job } from '@prisma/client'
import ComboBox from '@/components/ui/combo-box'
import getGenerativeAIResponse from '../../../../../../../../../Scripts/GoogleApi'
import Editor from '@/components/ui/editor'
import Preview from '@/components/ui/Preview'

interface propsTypes {
    jobId: string,
    intialJob: Job,
    isRequired: boolean
}

const formSchema = z.object({
    Description: z.string().min(100, {
        message: "Description must be at least 100 characters.",
    }),
})

const FullDescription = ({ jobId, intialJob, isRequired }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    // const [aiData, setAiData] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Description: intialJob.Description || ""
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
            const jobdata = await axios.patch(`/api/jobs/${jobId}`, value);

            toast("Job updated successfully")
            setEditing(!editing)

            router.refresh()

        } catch (error) {
            console.error("Error creating job:", error);
            // Optionally display an error message to the user
        }
    };


    const handlePromptGenerate = async () => {

        try {
            setIsPrompting(true)
            const customPrompts = `could you suggest job sort descrition for ${prompt ? prompt : intialJob.title} within 250 words including benifits,reservasion with a poin where each point will be bold font`

            await getGenerativeAIResponse(customPrompts).then((data) => {
                setGeminiData(data)
                // console.log(data)
                // form.setValue("Description", data)
                setIsPrompting(false)
            })
        } catch (error) {

        }
    }

    const onCopy = () => {
        navigator.clipboard.writeText(geminiData)
    }

    return (
        <div className='border px-2 pb-4 mt-3'>
            <div className="flex justify-between items-center py-4">
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
                            intialJob.Description && <Repeat2 onClick={() => handlePromptGenerate()} />
                        }
                    </div>
                    {
                        geminiData && (
                            <div className="relative w-full">
                                {
                                    geminiData
                                }
                                <div className="absolute right-1 top-1">
                                    <Button onClick={onCopy}><Copy size={20} /></Button>
                                </div>
                            </div>
                        )
                    }
                    {/* form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="Description"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>


                                            {/* <Textarea disabled={isSubmitting} placeholder=" Sort description " {...field} /> */}
                                            <Editor {...field} />

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
                !editing && (<div>
                    <Preview value={intialJob.Description} />
                </div>)
            }
        </div>
    )
}

export default FullDescription