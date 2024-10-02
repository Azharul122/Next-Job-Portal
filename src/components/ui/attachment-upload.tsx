"use client";

import { storge } from "../../../config/firebase.config"
import { toast } from "sonner"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { File, FilePlus, ImagePlus, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


import { url } from "inspector";

interface AttachmentsUploadsProps {
  disabled?: boolean;
  onChange: (value: { url: string; name: string }[]) => void;
  value: { url: string; name: string }[];
}

export const AttachmentsUploads = ({
  disabled,
  onChange,
  value,
}: AttachmentsUploadsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files || []);

    setIsLoading(true);

    // array to store newly uploaded urls
    const newUrls: { url: string; name: string }[] = [];

    // counter to keep track the uploaded files

    let completedFiles = 0;

    files.forEach((file: File) => {
      const uploadTask = uploadBytesResumable(
        ref(storge, `Attachments/${Date.now()}-${file.name}`),
        file,
        { contentType: file.type }
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            // store this url
            newUrls.push({ url: downloadurl, name: file.name });

            // increase the count of the counter
            completedFiles++;

            // check the files are uploaded or not
            if (completedFiles === files.length) {
              setIsLoading(false);

              onChange([...value, ...newUrls]);
            }
          });
        }
      );
    });
  };

  return (
    <div>
      <div className="w-full h-40 dark:bg-darkbg bg-lightbg p-2 flex items-center justify-center">
        {isLoading ? (
          <>
            <p>{`${progress.toFixed(0)}%`}</p>
          </>
        ) : (
          <>
            <label className="w-full h-full flex items-center justify-center">
              <div className="flex  gap-2 items-center justify-center cursor-pointer ">
                <FilePlus className="w-3 h-3 mr-2" />
                <p>Add a file</p>
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt"
                multiple
                className="w-0 h-0"
                onChange={onUpload}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

