const ping = async () => {
  const response = await window.versions.ping();
  console.log(response);
}

const chat = async () => {
  const q1 = "Hi there, how are you?";
  console.log("User: " + q1);
  const a1 = await window.electronAPI.chat(q1);
  console.log("AI: " + a1);
  const q2 = "Summarize what you said";
  console.log("User: " + q2);
  const a2 = await window.electronAPI.chat(q2);
  console.log("AI: " + a2);
}

const loadModel = async () => {
  console.log("loading model");
  await window.electronAPI.loadModel();
  console.log("model loaded");
  chat();
}

document.getElementById('info').innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
ping();
loadModel();
