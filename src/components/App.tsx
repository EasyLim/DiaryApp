import React from "react"
import { Diary } from "./Diary"

const app = window.require('@electron/remote')

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
                    <div className="top">
                        <nav>
                            <ul>
                                <li>
                                    <button>ඞ</button>
                                </li>
                                <li>
                                    <button className="active">ඞ</button>
                                </li>
                                <li>
                                    <button>ඞ</button>
                                </li>
                                <li>
                                    <button>ඞ</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="bottom">

                    </div>
                </div>
                <div className="pageContent"></div>
            </div>
        </div>
    )
}