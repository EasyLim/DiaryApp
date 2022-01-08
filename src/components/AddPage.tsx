import React, { FormEvent, useState } from "react"
import { INoteProperties } from "./INoteProperties"
import { addNote, getDiaryArray } from "./DiaryStorage"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote')

export function AddPage (props) : JSX.Element
{
    const [date, setDate] = useState(`${new Date(props.date).getFullYear()}-${String(new Date(props.date).getMonth()+1).padStart(2, "0")}-${String(new Date(props.date).getDate()).padStart(2, "0")}`)
    const [mood, setMood] = useState('0')
    const [text, setText] = useState('')
    const submit = (e: FormEvent) => {
        e.preventDefault()
        let dateTypeDate = new Date(date)
        const note: INoteProperties = {
            index: 0,
            date: `${dateTypeDate.getMonth()+1}.${dateTypeDate.getDate()}.${dateTypeDate.getFullYear()}`,
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

        addNote({date: note.date, mood: note.note.mood, text: note.note.text})
        props.setNotes(getDiaryArray())
        props.changePage('diary')

    }
    return (
        <div className="AddPage fadeIn">
            <h1>Добавить запись</h1>
            <form onSubmit={submit}>
                <input type="date" max={ `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` } value={ date } onChange={e => setDate(e.target.value)}/>
                <select defaultValue="0" name="mood" onChange={(e) => setMood(e.target.value)}>
                    <option disabled value="0">-- Выбери настроение --</option>
                    <option value="5">Отлично</option>
                    <option value="4">Хорошо</option>
                    <option value="3">Так себе</option>
                    <option value="2">Плохо</option>
                    <option value="1">Ужасно</option>
                </select><br />
                <textarea name="text" onChange={(e) => setText(e.target.value)}></textarea><br />
                <button type="submit">Сохранить</button>
            </form>
        </div>
    )
}