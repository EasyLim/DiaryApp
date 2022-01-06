import React, { useState } from "react"
import { daylioCSV } from "src/parsers/daylioCSV"
import { INoteProperties } from "./INoteProperties"
import { Note } from "./Note"

const addIcon = require('../static/icons/add.png')
const searchIcon = require('../static/icons/search.png')

export function Diary (props) : JSX.Element
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

    let notes = props.notes
    let setNotes = props.setNotes

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
                <button onClick={() => props.changePage('add')}>
                    <img src={addIcon} />
                </button>
            </div>
        </div>
    )
}