import React, { useState } from "react"
import { Note } from "./Note"
import { INoteProperties } from "./INoteProperties"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote') 

export function Diary () : JSX.Element
{
    let [notes, setNotes]: [INoteProperties[], React.Dispatch<INoteProperties[]>] = useState(
        JSON.parse(
            fs.readFileSync(path.join(app.getAppPath(), 'notes.json'), 'utf-8' )
        )
    )

    return (
        <div>
            {notes.map((note: INoteProperties) => 
                <Note noteData={note}/>
            )}
        </div>
    )
}