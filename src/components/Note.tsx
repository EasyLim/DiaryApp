import React from "react"
import { INoteProperties } from "./INoteProperties"

export function Note (props: {noteData: INoteProperties}) : JSX.Element
{
    const note = props.noteData
    return (
        <div className={"Note " + note.position}>
            <p className="date">{note.date}</p>
            {!note.note.isEmpty
                ?
                <><p className="mood">{note.note.mood}</p><p className="note">{note.note.text}</p></>
                :
                <p>Здесь пусто(</p>
            }
        </div>
    )
}