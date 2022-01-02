const { app, BrowserWindow } = require("electron")

require('@electron/remote/main').initialize()
//require("@electron/remote/main").enable(webContents)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // const remote = require('@electron/remote')
    // remote.require('@electron/remote/main').enable(win.webContents)
    require('@electron/remote/main').enable(win.webContents)

    win.loadURL('http://localhost:3000')
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