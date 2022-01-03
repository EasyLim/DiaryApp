import React from "react"
import { Diary } from "./Diary"

const app = window.require('@electron/remote')

const homeIcon = require("../static/icons/home.png")
const diaryIcon = require("../static/icons/diary.png")
const calendarIcon = require("../static/icons/calendar.png")
const statisticIcon = require("../static/icons/statistic.png")
const moreIcon = require("../static/icons/more.png")

export function App () : JSX.Element
{
    const minimize = () => {
        app.BrowserWindow.getFocusedWindow()?.minimize()
    }

    let maximized = false

    const maximize = () => {
        if (maximized) {
            app.BrowserWindow.getFocusedWindow()?.restore()
        } else {
            app.BrowserWindow.getFocusedWindow()?.maximize()
        }
        maximized = !maximized
    }

    const close = () => {
        app.BrowserWindow.getFocusedWindow()?.close()
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
                    <Diary />
                </div>
            </div>
        </div>
    )
}