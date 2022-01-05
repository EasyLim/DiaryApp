import React, { useState } from "react"
import { daylioCSV } from "src/parsers/daylioCSV"
import { INoteProperties } from "./INoteProperties"
import { Note } from "./Note"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote') 

const addIcon = require('../static/icons/add.png')
const searchIcon = require('../static/icons/search.png')

export function Diary () : JSX.Element
{
    window.onwheel = (e: WheelEvent) => {
        let copyNotes = [...notes]
        let focusIndex = copyNotes.indexOf(copyNotes.find(note => note.position == 'focus'))     
        if (e.deltaY > 0 && focusIndex < copyNotes.length - 1) {
            focusIndex++
        } else if (e.deltaY < 0 && focusIndex > 0) {
            focusIndex--
        }

        if (copyNotes[focusIndex - 2]) copyNotes[focusIndex - 2].position = 'lefter'
        if (copyNotes[focusIndex - 1]) copyNotes[focusIndex - 1].position = 'left'
        if (copyNotes[focusIndex]) copyNotes[focusIndex].position = 'focus'
        if (copyNotes[focusIndex + 1]) copyNotes[focusIndex + 1].position = 'right'
        if (copyNotes[focusIndex + 2]) copyNotes[focusIndex + 2].position = 'righter'
        setNotes(copyNotes)
    }

    const onClickFocus = (index) => {
        let copyNotes = [...notes]
        if (copyNotes[index - 2]) copyNotes[index - 2].position = 'lefter'
        if (copyNotes[index - 1]) copyNotes[index - 1].position = 'left'
        if (copyNotes[index]) copyNotes[index].position = 'focus'
        if (copyNotes[index + 1]) copyNotes[index + 1].position = 'right'
        if (copyNotes[index + 2]) copyNotes[index + 2].position = 'righter'
        setNotes(copyNotes)
    }

    // Parse notes.json
    let parsed: {id: number, date: string, mood: number, text: string}[] = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'notes.json'), 'utf-8' ))
    
    // Sort parsed days for counting skipped days later
    parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Map parsed data
    let result = parsed.map((note, index) => {
        let result = {
            date: note.date,
            note: {
                isEmpty: false,
                mood: note.mood,
                text: note.text
            },
            position: 'righter'
        }
        return result
    })

    // Calculate skipped days
    let skippedDays: {date: string, note: {isEmpty: boolean, mood: number, text: string}, position: string}[] = []
    for (let i = 0; i < result.length - 1; i++) {
        let daysSkippedCount = Math.floor((new Date(result[i].date).getTime() - new Date(result[i + 1].date).getTime()) / 86400000) - 1
        if (daysSkippedCount > 0) {
            for (let j = 1; j <= daysSkippedCount; j++) {
                let date = new Date(new Date(result[i].date).getTime() - 86400000 * j)
                let dateText = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`
                skippedDays.push({date: dateText, note: {mood: undefined, text: undefined, isEmpty: true}, position: 'righter'})
            }
        }
    }

    // Add skipped days to general array
    result = result.concat(skippedDays)

    // Sort general array and change date to human format
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    let final = result.map((note, index) => {
        let formatNote = {...note, index: index}
        formatNote.date = new Date(note.date).toLocaleDateString("ru", {year: 'numeric', month: 'long', day: 'numeric'}).slice(0, -2)
        return formatNote
    })
    if (final[0]) final[0].position = 'focus'
    if (final[1]) final[1].position = 'right'

    // Put result array to state
    const [notes, setNotes]: [INoteProperties[], React.Dispatch<INoteProperties[]>] = useState(final)
    return (
        <div className="Diary">
            <div className="notes">
                {notes.map((note) => 
                    <Note noteData={note} key={note.date} onClickFocus={onClickFocus}/>
                )}
            </div>
            <div className="diaryButtons">
                <button>
                    <img src={searchIcon} />
                </button>
                <button>
                    <img src={addIcon} />
                </button>
            </div>
        </div>
    )
}