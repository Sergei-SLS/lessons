import {ChangeEvent, useState} from "react";


type editableSpanProps = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: editableSpanProps) => {
    const [spanTitle, setSpanTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)

    const changeSpanTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(e.currentTarget.value)
    }

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(spanTitle)
    }

    return (
        <>
            {isEditMode ? (
                <input onChange={changeSpanTitle} onBlur={turnOffEditMode} value={spanTitle} autoFocus />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}