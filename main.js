/* Este código é o processo principal de um aplicativo Electron. Ele gerencia a criação da janela e a comunicação entre o processo principal (back-end) e o 
processo de renderização (front-end). */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    resizable: true,
    icon: path.join(__dirname, 'assets/alarm.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('index.html');
  //mainWindow.webContents.openDevTools(); // Ative para debug
}

app.whenReady().then(createWindow);

// Controle de janela
ipcMain.on('minimize', () => mainWindow.minimize());
ipcMain.on('maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
ipcMain.on('close', () => mainWindow.close());

// Reenvio dos eventos para o renderer
ipcMain.on('start-timer', () => {
  mainWindow.webContents.send('start-timer');
});
ipcMain.on('reset-timer', () => {
  mainWindow.webContents.send('reset-timer');
});


