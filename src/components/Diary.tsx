import React, { useState } from "react"
import { daylioCSV } from "src/parsers/daylioCSV"
import { INoteProperties } from "./INoteProperties"
import { Note } from "./Note"
const { app } = window.require('@electron/remote') 

const addIcon = require('../static/icons/add.png')
const searchIcon = require('../static/icons/search.png')

export function Diary (props) : JSX.Element
{
    let notes = props.notes
    console.log()
    let setNotes = props.setNotes

    window.onwheel = (e: WheelEvent) => {
        scrollNotes(e.deltaY > 0)
    }

    const getFocusIndex = () => { 
        return notes.indexOf(notes.find(note => note.position == 'focus')) 
    }

    const onClickFocus = (index) => {
        let focusIndex = getFocusIndex()
        if (focusIndex < index) scrollNotes(true)
        else if (focusIndex > index) scrollNotes(false)
    }

    const scrollNotes = (direction=true) => {
        let copyNotes = [...notes]
        let focusIndex = getFocusIndex()
        
        if (direction && focusIndex < copyNotes.length - 1) focusIndex++
        else if (!direction && focusIndex > 0) focusIndex--
        else return

        if (copyNotes[focusIndex - 2]) copyNotes[focusIndex - 2].position = 'lefter'
        if (copyNotes[focusIndex - 1]) copyNotes[focusIndex - 1].position = 'left'
        if (copyNotes[focusIndex]) copyNotes[focusIndex].position = 'focus'
        if (copyNotes[focusIndex + 1]) copyNotes[focusIndex + 1].position = 'right'
        if (copyNotes[focusIndex + 2]) copyNotes[focusIndex + 2].position = 'righter'
        setNotes(copyNotes)
    }

    return (
        <div className="Diary fadeIn">
            <div className="notes">
                {notes.map((note) => 
                    <Note noteData={note} key={note.date} setNotes={setNotes} changePage={props.changePage} onClickFocus={onClickFocus} setViewNote={props.setViewNote} setSkippedDayDate={props.setSkippedDayDate}/>
                )}
            </div>
            <div className="diaryButtons">
                <button>
                    <img src={searchIcon} />
                </button>
                <button onClick={() => {props.setSkippedDayDate(new Date().toISOString().split('T')[0]); props.changePage('add')}}>
                    <img src={addIcon} />
                </button>
            </div>
        </div>
    )
}