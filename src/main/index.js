/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-04T10:57:50-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-05T17:50:01-08:00
 */

'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
const SerialPort = require('serialport')
const ParserReadline = require('@serialport/parser-readline')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let ComPort = 0

ipcMain.on('connectDevice', (event, arg) => {
  if (ComPort) {
    mainWindow.webContents.send('deviceAlreadyConnected', '')
  }
  SerialPort.list((err, ports) => {
    if (err) {
      mainWindow.webContents.send('otherError', err.message)
      return
    }
    ports.forEach((port, index) => {
      mainWindow.webContents.send('addDevice', port.comName)
    })
    new Promise((resolve, reject) => {
      function devicePrompt () {
        ipcMain.once('chooseDevice', (event, answer) => {
          if (isNaN(answer) || parseInt(answer) <= 0 || parseInt(answer) > ports.length) {
            devicePrompt()
          } else {
            resolve(answer)
          }
        })
      }
      devicePrompt()
    }).then(selection => {
      ComPort = new SerialPort(ports[selection - 1].comName, { autoOpen: false, baudRate: 9600 })
      ComPort.open(function (err) {
        if (err) {
          mainWindow.webContents.send('connectError', err.message)
          return
        }
        mainWindow.webContents.send('connectSuccess', '')
      })
      const parser = ComPort.pipe(new ParserReadline({ delimiter: '\r\n' }))
      parser.on('data', data => {
        data = data.split('\t')
        mainWindow.webContents.send('serialData', JSON.stringify(data))
      })
      ComPort.on('error', function (err) {
        mainWindow.webContents.send('otherError', err.message)
      })
    })
  })
})

ipcMain.on('disconnectDevice', (event, arg) => {
  if (ComPort) {
    ComPort.close(err => {
      if (err) {
        mainWindow.webContents.send('disconnectError', err.message)
        return
      }
      mainWindow.webContents.send('disconnectSuccess', '')
      ComPort = 0
    })
  } else {
    mainWindow.webContents.send('disconnectSuccess', '')
    ComPort = 0
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
