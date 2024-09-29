"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import 'react-quill/dist/quill.bubble.css';

interface previewProps {
    value: string,

}

const Preview = ({ value }: previewProps) => {
    const RectQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])

    return (
        <div className="">
            <RectQuill value={value} readOnly theme="bubble" />
        </div>
    )
}

export default Preview