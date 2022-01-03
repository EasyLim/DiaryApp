import React, { useState } from "react"
import { Note } from "./Note"
import { INoteProperties } from "./INoteProperties"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote') 

export function Diary () : JSX.Element
{
    let parsed: {id: number, date: string, mood: number, text: string}[] = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'notes.json'), 'utf-8' ))
    parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    let result = parsed.map((note, index) => {
        let result = {
            date: note.date,
            note: {
                isEmpty: false,
                mood: note.mood,
                text: note.text
            }
        }
        return result
    })

    let skippedDays: {date: string, note: {isEmpty: boolean, mood: number, text: string}}[] = []

    for (let i = 0; i < result.length - 1; i++) {
        let daysSkippedCount = Math.floor((new Date(result[i].date).getTime() - new Date(result[i + 1].date).getTime()) / 86400000) - 1
        if (daysSkippedCount > 0) {
            for (let j = 0; j < daysSkippedCount; j++) {
                let date = new Date(new Date(result[i].date).getTime() - 86400000)
                let dateText = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`
                skippedDays.push({date: dateText, note: {mood: undefined, text: undefined, isEmpty: true}})
            }
        }
    }

    result = result.concat(skippedDays)
    
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const [notes, setNotes] = useState(result)
    return (
        <div className="Diary">
            <div className="notes">
                {notes.map((note) => 
                    <Note noteData={note} key={note.date}/>
                )}
            </div>
        </div>
    )
}