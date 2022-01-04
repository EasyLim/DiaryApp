const { app, BrowserWindow } = require("electron")

require('@electron/remote/main').initialize()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1600,
        minWidth: 800,
        height: 900,
        minHeight: 600,
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
