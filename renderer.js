window.electronAPI.focusLyricEditor(() => {
  document.querySelector('lyric-editor')?.focus();
});

const ping = async () => {
  const response = await window.versions.ping();
  console.log(response);
}

const promptModel = async () => {

  let promptText = `Write 2 more lines of this song. Do not add commentary. Do not put the lyrics you generate in quotes.
Context:
Imagine there's no heaven
It's easy if you try`;

  let completion = await window.electronAPI.promptModel(promptText);

  // No hell below us
  // Above us only sky
  console.log(completion);

  promptText = `Write 2 more lines of this song. Do not add commentary. Do not put the lyrics you generate in quotes.
Context:
These urban streets are dull and gray
Can't find a glimmer of hope anywhere`;
  completion = await window.electronAPI.promptModel(promptText);

  // The chimneys spew out plumes of smoke
  // And sky looms dark with despair
  console.log(completion);
}

const sizeTextArea = () => {
  document.getElementById('lyric-editor').style.width = `${window.innerWidth - 25}px`;
  document.getElementById('lyric-editor').style.height = `${window.innerHeight - 25}px`;
};

const loadModel = async () => {
  console.log("loading model");
  await window.electronAPI.loadModel();
  console.log("model loaded");
  promptModel();
}

sizeTextArea();
document.getElementById('lyric-editor').focus();
window.addEventListener('resize', sizeTextArea);
console.log(`chrome ${versions.chrome()}, node ${versions.node()}, electron ${versions.electron()}`);
ping();
loadModel();
