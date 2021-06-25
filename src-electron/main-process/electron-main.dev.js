/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

import electronDebug from 'electron-debug'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { app, BrowserWindow, Notification } from 'electron'
const Pushy = require('pushy-electron');

app.whenReady().then(() => {
  // allow for a small delay for mainWindow to be created
  setTimeout(() => {
    // Install `electron-debug` with `devtron`
    electronDebug({ showDevTools: false })

    // Install vuejs devtools
    installExtension(VUEJS_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`)
        // get main window
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
          win.webContents.on('did-finish-load', () => {
              Pushy.listen();
              Pushy.register({ appId: '60d3d019be50e00f1b8f5924' }).then((deviceToken) => {
                // Display an alert with device token
                  new Notification({ title: 'Pushy device token ', body: 'this is it : vvvvvvvvvvvvvvvvvvvvvv' + deviceToken, icon: 'src-electron/icons/icon.ico' }).show()
              }).catch((err) => {
                  // Display error dialog
                  Pushy.alert(win, 'Pushy registration error: ' + err.message);
              });
              Pushy.setNotificationListener((data) => {
                // Display an alert with the "message" payload value
                new Notification({ title: data.title ?? 'lolz', body: data.message, icon: 'src-electron/icons/icon.ico' }).show()
             });
          })
          win.webContents.on('did-frame-finish-load', () => {
            win.webContents.once('devtools-opened', () => {
              win.webContents.focus()
              
             
            })
            // open electron debug
            console.log('Opening dev tools')
            win.webContents.openDevTools()
          })
        }
      })
      .catch(err => {
        console.log('An error occurred: ', err)
      })
  }, 250)
})

import './electron-main'
