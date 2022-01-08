import React, { FormEvent, useState } from "react"
import { INoteProperties } from "./INoteProperties"
import { addNote, deleteNote, getDiaryArray, parseDiaryJson } from "./DiaryStorage"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote')

export function EditPage (props) : JSX.Element
{
    const [mood, setMood] = useState(props.viewNote.note.mood.toString())
    const [text, setText] = useState(props.viewNote.note.text)

    const submit = (e: FormEvent) => {
        e.preventDefault()
        let date = props.viewNote.date
        const note: INoteProperties = {
            index: props.viewNote.index,
            date: date,
            note: {
                isEmpty: false,
                mood: Number(mood),
                text: text
            },
            position: 'lefter'
        }
        props.notes.map(note => {
            note.index++
            return note
        })
        const noteDate = note.date
        deleteNote(note.date)
        addNote({date: noteDate, mood: note.note.mood, text: note.note.text})
        props.setNotes(getDiaryArray())
        props.changePage('diary')
        
    }
    return (
        <div className="AddPage fadeIn">
            <h1>Редактирование</h1>
            <form onSubmit={submit}>
                <label>Выбери настроение:</label>
                <select defaultValue="5" name="mood" onChange={(e) => setMood(e.target.value)} value={mood}>
                    <option value="5">Отлично</option>
                    <option value="4">Хорошо</option>
                    <option value="3">Так себе</option>
                    <option value="2">Плохо</option>
                    <option value="1">Ужасно</option>
                </select><br />
                <textarea name="text" onChange={(e) => setText(e.target.value)} value={text}></textarea><br />
                <button type="submit">Сохранить</button>
            </form>
        </div>
    )
}