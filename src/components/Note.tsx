import React from "react"
import { INoteProperties } from "./INoteProperties"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote') 

const moreIcon = require('../static/icons/more.png')

export function Note (props: {noteData: INoteProperties}) : JSX.Element
{
    const note = props.noteData
    const moodList = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'settings.json'))).mood
    console.log(moodList[1])
    return (
        <div className={"Note " + note.position}>
            {!note.note.isEmpty
                ?
                <>
                    <div className="top">
                        <div className="left">
                            <img src={require(`../static/icons/${note.note.mood}.svg`)} />
                            <div>
                                <p className="date">{note.date}</p>
                                <p className="mood" style={{color: moodList[note.note.mood].color}}>{moodList[note.note.mood].text}</p>
                            </div>
                        </div>
                        <button>
                            <img src={moreIcon} />
                        </button>
                    </div>
                    
                    
                    <p className="note">{note.note.text}</p>
                </>
                :
                <p>Здесь пусто(</p>
            }
        </div>
    )
}