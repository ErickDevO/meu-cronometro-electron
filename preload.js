/* Este trecho de código é usado em um aplicativo Electron para criar uma ponte segura entre o processo de renderização (interface do usuário) e o 
processo principal (back-end). */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  close: () => ipcRenderer.send('close'),

  // Enviando eventos para iniciar e resetar o timer
  startTimer: () => ipcRenderer.send('start-timer'),
  resetTimer: () => ipcRenderer.send('reset-timer'),

  // Escutando eventos vindos do processo principal
  onStartTimer: (callback) => ipcRenderer.on('start-timer', callback),
  onResetTimer: (callback) => ipcRenderer.on('reset-timer', callback),
});
