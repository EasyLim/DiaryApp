import React, { FormEvent, useState } from "react"
import { INoteProperties } from "./INoteProperties"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote')

export function AddPage (props) : JSX.Element
{
    const [mood, setMood] = useState('0')
    const [text, setText] = useState('')

    const submit = (e: FormEvent) => {
        e.preventDefault()
        let date = new Date()
        const note: INoteProperties = {
            index: 0,
            date: date.toLocaleDateString("ru", {year: 'numeric', month: 'long', day: 'numeric'}).slice(0, -2),
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

        props.setNotes([note, ...props.notes])
        console.log([note, ...props.notes])
        props.changePage('diary')

        let fileData = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'notes.json'), 'utf-8' ))
        fileData.push({date: note.date, mood: note.note.mood, text: note.note.text})
        fs.writeFileSync(path.join(app.getAppPath(), 'notes.json'), JSON.stringify(fileData))
    }
    return (
        <div className="AddPage">
            <h1>Страница добавки записи</h1>
            <form onSubmit={submit}>
                <select name="mood" onChange={(e) => setMood(e.target.value)}>
                    <option value="0">-- Выбери настроение --</option>
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