const { app, BrowserWindow } = require('electron')
const { is } = require('electron-util')

let window

function createWindow() {
  window = new BrowserWindow({
    width: 600,
    height: 378,
    resizable: false,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: false,
    },
  })

  window.loadFile(`${__dirname}/../index.html`)

  if (is.development) {
    window.webContents.openDevTools()
  }

  window.on('closed', () => {
    window = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!window) {
    createWindow()
  }
})
