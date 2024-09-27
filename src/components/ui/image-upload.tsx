"use client"

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { ImagePlusIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { storge } from "../../../config/firebase.config"
import { toast } from "sonner"

interface imageProps {
    disabled?: boolean,
    value: string
    onChange: (value: string) => void
    onRemove: (value: string) => void

}
const ImageUploadToFirebase = ({ disabled, value, onChange, onRemove }: imageProps) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isProgress, setIsProgress] = useState<number>(0)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    const hanleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file: File = e.target.files[0]
        setIsLoading(true)
        const data1 = uploadBytesResumable(
            ref(storge, `jobCoverImage/${Date.now()}-${file?.name}`),
            file,
            {
                contentType: file.type
            }
        )

        data1.on(
            "state_changed",
            (snapshot) => {
                setIsProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                console.error(error.message);
            },
            () => {
                getDownloadURL(data1.snapshot.ref).then((downloadurl) => {
                    // store this url
                    // newUrls.push({ url: downloadurl, name: file.name });

                    // // increase the count of the counter
                    // completedFiles++;

                    // // check the files are uploaded or not
                    // if (completedFiles === files.length) {
                    setIsLoading(false);
                    onChange(downloadurl)

                    //   onChange([...value, ...newUrls]);
                    // }
                });
            }
        );
    }

    const ondelete = () => {
        onRemove(value)
        deleteObject(ref(storge, value)).then(() => {
            toast("Image deleted")
        })
    }

    return (
        <div>
            {
                value ? (<div className="relative aspect-video mt-2 w-full h-60 overflow-hidden">
                    <Image src={value} className='size-full object-cover' fill alt='Image' />
                    <div onClick={ondelete} className="absolute right-2 top-2 p-2 bg-red-100 rounded">
                        <Trash2 />
                    </div>
                </div>) : (<div className="flex justify-center items-center relative aspect-video mt-2 w-full h-60 overflow-hidden">
                    {
                        isLoading ? <>
                            <p>{`${isProgress.toFixed(2)}%`}</p>
                        </> : <>
                            <label>
                                <div className="flex size-full flex-col justify-center items-center">
                                    <ImagePlusIcon />
                                    <p>Upload an image</p>
                                    <input type="file" accept="image/*" className="size-0" name="" id="" onChange={hanleImageUpload} />
                                </div>
                            </label>
                        </>
                    }
                </div>)
            }

        </div>
    )
}

export default ImageUploadToFirebase