"use client"

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
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
})

const CreateJob = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })
    const { isSubmitting, isValid } = form.formState
    const router = useRouter()

    const onSubmit = async (value: z.infer<typeof formSchema>) => {

        try {
            const jobdata = await axios.post("/api/jobs", value);

            toast("Job created successfully")

            router.push(`./create-job/${jobdata.data.id}`)

        } catch (error) {
            console.error("Error creating job:", error);
            // Optionally display an error message to the user
        }
    };


    return (
        <div>
            <title>Create new job</title>

            <div className="">

                <div className="title">
                    <p>Create new job</p>
                </div>
                {/* form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job title</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="shadcn" {...field} />
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

        </div>
    )
}

export default CreateJob