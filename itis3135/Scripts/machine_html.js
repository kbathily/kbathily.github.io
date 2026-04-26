function playSound(key) {
  const audio = document.getElementById(key);
  const pad = audio.parentElement;
  const display = document.getElementById("display");

  if (!audio) return;

  audio.currentTime = 0; // restart sound
  audio.play();

  display.innerText = pad.id; // show sound name
}

// Click event
const pads = document.querySelectorAll(".drum-pad");

pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const key = pad.innerText.trim();
    playSound(key);
  });
});

// Keyboard event
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();

  const validKeys = ["Q","W","E","A","S","D","Z","X","C"];

  if (validKeys.includes(key)) {
    playSound(key);
  }
});