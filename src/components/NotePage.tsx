import React from "react"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require("@electron/remote")

export function NotePage (props) : JSX.Element
{
    const moodList = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'settings.json'))).mood
    return (
        <div className="NotePage fadeIn">
            <div className="top">
                <div className="left">
                    <img src={require(`../static/icons/${props.viewNote.note.mood}.svg`)} />
                    <div>
                        <p className="date">{new Date(props.viewNote.date).toLocaleDateString("ru", {year: 'numeric', month: 'long', day: 'numeric'}).slice(0, -2)}</p>
                        <p className="mood" style={{color: moodList[props.viewNote.note.mood].color}}>{moodList[props.viewNote.note.mood].text}</p>
                    </div>
                </div>
            </div>
            <p className="noteViewText">{props.viewNote.note.text}</p>
        </div>
    )
}