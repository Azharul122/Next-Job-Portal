
"use client"
// import { AttachmentsUploads } from "@/components/attachments-uploads";
// import { ImageUpload } from "@/components/image-upload";
import { AttachmentsUploads } from "@/components/ui/attachment-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Job, Attachment } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Loader2, Pencil, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import toast from "react-hot-toast";
import { z } from "zod";

interface AttachmentsFormProps {
  initialData: Job & { attachments: Attachment[] };
  jobId: string;
}

const formSchema = z.object({
  attachments: z.object({ url: z.string(), name: z.string() }).array(),
});

export const AttachmentsForm = ({
  initialData,
  jobId,
}: AttachmentsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  // Assuming initialData is available and has type of any
  const initialAttachments = Array.isArray(initialData?.attachments)
    ? initialData.attachments.map((attachment: any) => {
        if (
          typeof attachment === "object" &&
          attachment !== null &&
          "url" in attachment &&
          "name" in attachment
        ) {
          return { url: attachment.url, name: attachment.name };
        }
        return { url: "", name: "" }; // Provide default values if the shape is incorrect
      })
    : [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachments: initialAttachments,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(
        `/api/jobs/${jobId}/attachments`,
        values
      );
      toast.success("Job Attachment updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.log((error as Error)?.message);
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  const onDelete = async (attachment: Attachment) => {
    try {
      setDeletingId(attachment.id);

      await axios.delete(`/api/jobs/${jobId}/attachments/${attachment.id}`);
      toast.success("Attachment Removed");
      router.refresh();
    } catch (error) {
      console.log((error as Error)?.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border dark:bg-darkbg rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Job Attachments
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* display the attachments if not editing */}
      {!isEditing && (
        <div className="space-y-2">
          {initialData.attachments.map((item) => (
            <div
              key={item.url}
              className="p-3 w-full bg-purple-100 border-purple-200 border text-purple-700 rounded-md flex items-center"
            >
              <File className="w-4 h-4 mr-2 " />
              <p className="text-xs w-full truncate">{item.name}</p>
              {deletingId === item.id && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="p-1"
                  type="button"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              )}
              {deletingId !== item.id && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="p-1"
                  onClick={() => {
                    onDelete(item);
                  }}
                  type="button"
                >
                  <X className="w-4 h4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* on editing mode display the input */}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AttachmentsUploads
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(attachments) => {
                        if (attachments) {
                          onSubmit({ attachments });
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};