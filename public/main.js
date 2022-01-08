const { app, BrowserWindow } = require("electron")

const path = require("path")
const isDev = require("electron-is-dev")

require('@electron/remote/main').initialize()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1600,
        minWidth: 1175,
        height: 900,
        minHeight: 800,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        },
        autoHideMenuBar: true,
        frame: false,
        titleBarStyle: 'hidden'
    })

    require('@electron/remote/main').enable(win.webContents)

    win.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
