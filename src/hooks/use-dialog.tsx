import { useState } from "react"

export const useDialog = () => {
    const [open, setOpen] = useState(false)

    const openDialog = () => setOpen(true)
    const closeDialog = () => setOpen(false)
    const toggleDialog = (newValue: boolean) => {
        setOpen(newValue)
    }

    return {
        isOpen: open,
        openDialog,
        closeDialog,
        toggleDialog
    }
}