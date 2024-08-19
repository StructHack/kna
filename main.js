
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')

const createWindow = ()=>{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
           nodeIntegration:true,
           sandbox:false,
           contextIsolation:false
        }
    })
    win.loadFile('index.html')
}

app.whenReady().then(()=>{

    createWindow()
    app.on('activate',()=>{
        if(BroweserWindow.getAllWindows().length === 0) createWindow()
    })

    
})