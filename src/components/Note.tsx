import React, { useState } from "react"
import { INoteProperties } from "./INoteProperties"

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote') 

const showIcon = require('../static/icons/show.png')
const editIcon = require('../static/icons/edit.png')
const deleteIcon = require('../static/icons/delete.png')

export function Note (props: {noteData: INoteProperties}) : JSX.Element
{
    const note = props.noteData
    const moodList = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'settings.json'))).mood
    
    const [shownOptions, setShownOptions] = useState(false)
    const showOptions = () => {
        if (note.position == 'focus') setShownOptions(!shownOptions)
    }

    if (note.position !== 'focus' && shownOptions == true) setShownOptions(false)
    
    return (
        <div className={"Note " + note.position + (shownOptions && note.position == 'focus' ? ' options' : '')} onClick={showOptions}>
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
                    </div>
                    
                    <div className="bottom">
                        <p className="text">{note.note.text}</p>
                        <div className={"optionsButtons" + (shownOptions && note.position == 'focus' ? ' options' : '')}>
                            <button>
                                <img src={showIcon} />
                            </button>
                            <button>
                                <img src={editIcon} />
                            </button>
                            <button className="delete">
                                <img src={deleteIcon} />
                            </button>
                        </div>
                    </div>
                </>
                :
                <p>Здесь пусто(</p>
            }
        </div>
    )
}