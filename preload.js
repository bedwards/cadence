const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
});


contextBridge.exposeInMainWorld("electronAPI", {
  loadModel: () => ipcRenderer.invoke("loadModel"),
  promptModel: (promptText) => ipcRenderer.invoke("promptModel", promptText),
  focusLyricEditor: (callback) => ipcRenderer.on('focus-lyric-editor', callback)
});

