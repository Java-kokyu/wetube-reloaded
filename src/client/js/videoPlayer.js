const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

let volume = volumeRange.value;

const handlePlayBtn = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteBtn = (event) => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volume;
  } else {
    video.muted = true;
    volumeRange.value = 0;
  }
  muteBtn.innerText = video.muted ? "UnMute" : "Mute";
};

const handleVolume = (event) => {
  const { value } = event.target;
  volume = value;
  video.volume = volume;
};

playBtn.addEventListener("click", handlePlayBtn);
muteBtn.addEventListener("click", handleMuteBtn);
volumeRange.addEventListener("input", handleVolume);
