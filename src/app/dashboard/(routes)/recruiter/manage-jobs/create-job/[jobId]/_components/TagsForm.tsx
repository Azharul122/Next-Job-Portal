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
import ComboBox from '@/components/ui/combo-box'
import { Textarea } from '@/components/ui/textarea'
import getGenerativeAIResponse from '../../../../../../../../../Scripts/GoogleApi'

interface propsTypes {
    jobId: string,
    intialJob: Job,
    isRequired: boolean
}

const formSchema = z.object({
    tags: z.array(z.string()).min(1, {
        message: "At leaset one tage",
    }),
})

const TagsForm = ({ jobId, intialJob, isRequired }: propsTypes) => {
    const [editing, setEditing] = useState(false)
    const [aiData, setAiData] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tags: intialJob.tags || ""
        }
    })
    const { isSubmitting, isValid } = form.formState
    const [prompt, setPrompt] = useState("")
    const [isPrompting, setIsPrompting] = useState(false)
    let [jobTags, setJobTags] = useState<string[]>(intialJob.tags)

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

            const customPrompts = `Generate an array of top 5 keywords related to the job profession "${prompt}". These keywords should encompass various aspects of the profession, including skills, responsibilities, tools, and technologies commonly associated with it. Aim for a diverse set of keywords that accurately represent the breadth of the profession. Your output should be a array of keywords. Just return me the array alone with parse data.`;

            await getGenerativeAIResponse(customPrompts).then((data) => {
                setJobTags(JSON.parse(data))
                // setJobTags(JSON.parse(data))
                // if (Array.isArray( data)) {
                //     // console.log(data)
                //     // setJobTags((prevTags) => [...prevTags, ...data])
                // }

                // form.setValue("tags", data)
                setIsPrompting(false)
            })
        } catch (error) {
            console.log(error)
        }
    }


    const handleTagRemove = (idx: number) => {

        // const updatedDate=[...jobTags]
        // updatedDate.slice(idx,1)
        // setJobTags(updatedDate)

        setJobTags(prevTags => prevTags.filter((_, i) => i !== idx));
    }

    return (
        <div className='border px-2 pb-4 mt-3'>
            <div className="flex justify-between items-center py-4">
                <p>Tags <sup className={`${isRequired ? "text-red-500" : "hidden"}`}>*</sup></p>
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
                        <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Make tags with AI" className='w-full' />
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
                            intialJob.tags && <Repeat2 onClick={() => handlePromptGenerate()} />
                        }
                    </div>

                    {/* Tags container*/}
                    {
                        jobTags.length > 0 && <div className="flex gap-2 items-center flex-wrap">
                            {

                                jobTags.map((jobTag, index) => (<div key={jobTag} className='border py-2 px-3 flex gap-2 items-center rounded'>
                                    {jobTag}
                                    <button className='text-bold text-gradient-start cursor-pointer' onClick={() => handleTagRemove(index)}>X</button>
                                </div>))
                            }
                        </div>


                    }




                    {
                        isSubmitting ? (
                            <Button disabled>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 mt-3">
                                <Button disabled={isSubmitting} variant="outline"
                                    type="submit" onClick={() => onSubmit({ tags: jobTags })} className='disabled:bg-opacity-15 disabled:cursor-not-allowed'>
                                    Save
                                </Button>
                                {
                                    jobTags.length > 0 && (
                                        <Button disabled={isSubmitting} onClick={()=>setJobTags([])} variant="outline"
                                              className='disabled:bg-opacity-15 disabled:cursor-not-allowed'>
                                            Clear All
                                        </Button>
                                    )
                                }
                            </div>
                        )
                    }

                </div>
            }
            {
                editing ? "" : (<div className="">
                    {
                        jobTags?.length > 0 ? (
                            <div className="flex gap-2 items-center flex-wrap">
                                {
                                    jobTags.map((jobTag, index) => (
                                        <div key={`${jobTag}-${index}`} className='border py-2 px-3 flex gap-2 items-center rounded'>
                                            {jobTag}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <p>No tags</p>
                        )
                    }
                </div>)
            }

        </div>
    )
}

export default TagsForm