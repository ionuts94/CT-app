import { useState } from "react"

export const useDialog = () => {
    const [open, setOpen] = useState(false)

    const openDialog = () => setOpen(true)
    const closeDialog = () => setOpen(false)
    const toggleDialog = () => {
        if (!open) return;
        setOpen(prev => !prev)
    }

    return {
        isOpen: open,
        openDialog,
        closeDialog,
        toggleDialog
    }
}