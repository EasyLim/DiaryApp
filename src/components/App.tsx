import React, { useState } from "react"
import { AddPage } from "./AddPage"
import { Diary } from "./Diary"
import { INoteProperties } from "./INoteProperties"
import { NotePage } from "./NotePage"
import { getDiaryArray } from "./DiaryStorage"
import { EditPage } from "./EditPage"

const remoteApp = window.require('@electron/remote')

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
  
    // Put result array to state
    const [notes, setNotes]: [INoteProperties[], React.Dispatch<INoteProperties[]>] = useState(getDiaryArray())
    const [viewNote, setViewNote] = useState({})

    const changePage = (page: string) => {
        setPage(page)
    }

    let getPage = () => {
       
        switch (page) {
            case 'diary': return <Diary notes={notes} setNotes={setNotes} changePage={changePage} setViewNote={setViewNote}/>
            case 'note': return <NotePage viewNote={viewNote}/>
            case 'add': return <AddPage notes={notes} setNotes={setNotes} changePage={changePage}/>
            case 'edit': return <EditPage notes={notes} setNotes={setNotes} changePage={changePage} viewNote={viewNote}/>
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
        remoteApp.BrowserWindow.getFocusedWindow().close()
    }

    return (
        <div className="App fadeIn">
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
                                    <button id="btn_diary" className="active" onClick={ () => { changePage("diary") }}>
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