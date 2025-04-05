import {useState} from "react";


type editableSpanProps = {
    value: string
}

export const EditableSpan = ({value}: editableSpanProps) => {
    const [isEditMode, setIsEditMode] = useState(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    return (
        <>
            {isEditMode ? (
                <input value={value} autoFocus />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}