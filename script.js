const video = document.getElementById("player");
const playBtn = document.getElementById("play");
const progressBar = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar");
const progressHandle = document.querySelector(".progress-handle");

// Alternar play/pause y cambiar ícono
playBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playBtn.src = "assets/iconos/pause.svg"; // cambia a pausa
  } else {
    video.pause();
    playBtn.src = "assets/iconos/play.svg"; // cambia a play
  }
});

// Actualizar barra y círculo mientras se reproduce
video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
  progressHandle.style.left = percent + "%";
});

// Permitir retroceder/adelantar al hacer clic en la barra
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const newTime = (clickX / rect.width) * video.duration;
  video.currentTime = newTime;
});

// Arrastrar el círculo para mover el tiempo
let isDragging = false;

progressHandle.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = progressContainer.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    const percent = (offsetX / rect.width) * 100;
    progressBar.style.width = percent + "%";
    progressHandle.style.left = percent + "%";
    video.currentTime = (offsetX / rect.width) * video.duration;
  }
});