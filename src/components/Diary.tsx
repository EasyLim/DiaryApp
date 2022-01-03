import React, { useState } from "react"
import { Note } from "./Note"
import { INoteProperties } from "./INoteProperties"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote') 

export function Diary () : JSX.Element
{
    let parsed: {id: number, date: number, mood: number, text: string}[] = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'notes.json'), 'utf-8' ))
    let result = parsed.map((note) => {
        let result = {
            id: note.id,
            date: new Date(note.date),
            mood: note.mood,
            text: note.text
        }
        return result
    })
    let [notes, setNotes]: [INoteProperties[], React.Dispatch<INoteProperties[]>] = useState(result)

    return (
        <div className="Diary">
            <div className="notes">
                {notes.map((note: INoteProperties) => 
                    <Note noteData={note} key={note.id}/>
                )}
            </div>
        </div>
    )
}