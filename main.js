import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import {getLlama, LlamaChatSession} from "node-llama-cpp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const modelFilename = "hf_unsloth_Llama-3.2-3B-Instruct.Q4_K_M.gguf";
const modelFilename = "cadence-llama32-3b-instruct-q4km-kaggle.gguf";
// const modelFilename = "cadence-llama32-3b-instruct-q4km-colab.gguf";

const modelPath = path.join(__dirname, "models", modelFilename);
let llama, model, context, session;

async function loadModel() {
  llama = await getLlama();
  model = await llama.loadModel({modelPath});
  context = await model.createContext();
  session = new LlamaChatSession({
      contextSequence: context.getSequence()
  });
  return true;
}

ipcMain.handle("loadModel", loadModel);

async function promptModel(event, promptText) {
  return await session.prompt(promptText, {

    maxTokens: 128,
    temperature: 1.5,
    minP: 0.1,

    top_p: 0.95,
    top_k: 40,
    repeat_penalty: 1.1,
    stop: ["\n\n"]
  })
}

ipcMain.handle("promptModel", promptModel);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {preload: path.join(__dirname, 'preload.js')}
  });

  win.maximize();
  win.loadFile('index.html');
  win.webContents.openDevTools();
  win.webContents.once('devtools-opened', () => {
    win.webContents.focus();
    win.webContents.send('focus-lyric-editor');
  });
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
