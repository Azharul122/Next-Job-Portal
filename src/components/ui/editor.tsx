"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import 'react-quill/dist/quill.snow.css';


interface editorProps {
    value: string,
    onChange: (value: string) => void
}

const Editor = ({ value, onChange }: editorProps) => {
    const RectQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])

    const fontOptions = [
        { value: 'arial', label: 'Arial' },
        { value: 'courier', label: 'Courier' },
        { value: 'georgia', label: 'Georgia' },
        { value: 'impact', label: 'Impact' },
        { value: 'times-new-roman', label: 'Times New Roman' },
        { value: 'verdana', label: 'Verdana' },

    ];

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }], 
            ['bold', 'italic', 'underline'], 
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
            [{ 'color': [] }, { 'background': [] }], 
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],          
            [{ 'direction': 'rtl' }], 
            [{ 'script': 'sub'}, { 'script': 'super' }],  
            ['clean'] 
        ],
    }

    return (
        <div className="">
            <RectQuill
                value={value}
                onChange={onChange}
                theme="snow"
                modules={modules}
            />
        </div>
    )
}

export default Editor;
