import {ChangeEvent, KeyboardEvent, useState} from "react";


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

    const cancelEditMode = () => {
        setSpanTitle(value);
        setIsEditMode(false)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            turnOffEditMode();
        }
        if (e.key === 'Escape') {
            cancelEditMode()
        }
    }

    return (
        <>
            {isEditMode ? (
                <input onChange={changeSpanTitle}
                       onBlur={turnOffEditMode}
                       onKeyDown={onKeyDownHandler}
                       value={spanTitle} autoFocus />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}