"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

interface ModalProps {
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}


const Modal = ({ title, description, isOpen, onClose, children }: ModalProps) => {

    const onCahnge=(open:boolean)=>{
        if(!open){
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onCahnge}>
            
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                       {
                        description
                       }
                    </DialogDescription>
                </DialogHeader>
                <div className="">{children}</div>
            </DialogContent>
        </Dialog>

    )
}

export default Modal