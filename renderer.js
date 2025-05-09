window.electronAPI.focusLyricEditor(() => {
  document.querySelector('lyric-editor')?.focus();
});

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

const sizeTextArea = () => {
  document.getElementById('lyric-editor').style.width = `${window.innerWidth - 25}px`;
  document.getElementById('lyric-editor').style.height = `${window.innerHeight - 25}px`;
};

const loadModel = async () => {
  console.log("loading model");
  await window.electronAPI.loadModel();
  console.log("model loaded");
  chat();
}

sizeTextArea();
document.getElementById('lyric-editor').focus();
window.addEventListener('resize', sizeTextArea);
console.log(`chrome ${versions.chrome()}, node ${versions.node()}, electron ${versions.electron()}`);
ping();
loadModel();
