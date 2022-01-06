import React, { useState } from "react"
import { AddPage } from "./AddPage"
import { Diary } from "./Diary"
import { INoteProperties } from "./INoteProperties"
import { NotePage } from "./NotePage"

const fs = window.require('fs')
const path = window.require('path')
const remoteApp = window.require('@electron/remote')
const { app } = window.require('@electron/remote')

const homeIcon = require("../static/icons/home.png")
const diaryIcon = require("../static/icons/diary.png")
const calendarIcon = require("../static/icons/calendar.png")
const statisticIcon = require("../static/icons/statistic.png")
const moreIcon = require("../static/icons/more.png")

export function App () : JSX.Element
{
    const [page, setPage] = useState('diary')
    /* TODO Pages:
        Diary page, Note page, Add page, Edit page, Calendar page, Statistic page, 
        Home page, Options page and option's pages
    */

    // Parse notes.json
    let parsed: {date: string, mood: number, text: string}[] = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'notes.json'), 'utf-8' ))
    
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

    const changePage = (page: string) => {
        setPage(page)
    }

    let getPage = () => {
        switch (page) {
            case 'diary': return <Diary notes={notes} setNotes={setNotes} changePage={changePage} />
            case 'note': return <NotePage />
            case 'add': return <AddPage notes={notes} setNotes={setNotes} changePage={changePage}/>
        }
    }

    const minimize = () => {
        remoteApp.BrowserWindow.getFocusedWindow().minimize()
    }

    let maximized = false

    const maximize = () => {
        if (maximized) {
            remoteApp.BrowserWindow.getFocusedWindow().restore()
        } else {
            remoteApp.BrowserWindow.getFocusedWindow().maximize()
        }
        maximized = !maximized
    }

    const close = () => {
        console.log(remoteApp)
        remoteApp.BrowserWindow.getFocusedWindow().close()
    }

    return (
        <div className="App">
            <div id="titleBar">
                <div className="buttons">
                    <button id="minimizeButton" onClick={minimize}></button>
                    <button id="maximizeButton" onClick={maximize}></button>
                    <button id="closeButton" onClick={close}></button>
                </div>
            </div>
            <div className="content">
                <div className="leftNavMenu">
                    <nav>
                        <ul>
                            <div>
                                <li>
                                    <button>
                                        <img src={homeIcon}/>
                                    </button>
                                </li>
                                <li>
                                    <button className="active">
                                        <img src={diaryIcon}/>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <img src={calendarIcon}/>
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <img src={statisticIcon}/>
                                    </button>
                                </li>
                            </div>
                            <li>
                                <button>
                                    <img src={moreIcon}/>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="pageContent">
                    {
                        getPage()
                    }
                </div>
            </div>
        </div>
    )
}