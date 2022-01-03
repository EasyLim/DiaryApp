import React from "react"
import { INoteProperties } from "./INoteProperties"

export function Note (props: {noteData: INoteProperties}) : JSX.Element
{
    const note = props.noteData
    return (
        <div className="Note">
            <p className="date">{note.date.getDate()}.{note.date.getMonth() + 1}.{note.date.getFullYear()}</p>
            <p className="mood">{note.mood}</p>
            <p className="note">{note.text}</p>
        </div>
    )
}