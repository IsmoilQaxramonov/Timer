let secondomer: HTMLDivElement = document.querySelector(
  ".sekundomer"
) as HTMLDivElement;
const startBtn: HTMLButtonElement = document.querySelector(
  ".start-btn"
) as HTMLButtonElement;
const btns = document.querySelectorAll<HTMLButtonElement>("button");
const btnArray = Array.from(btns);
const body = document.querySelector<HTMLBodyElement>("body");
const boxes = document.querySelector<HTMLDivElement>(".boxes");
btnArray[0].style.background = "#A44E4E";

let minutes: number = 180; // 3 soat
let seconds: number = 0;
let intervalId: number | null = null;
const alarmSound = new Audio("./alarm3.wav");
alarmSound.preload = "auto";
alarmSound.volume = 1.0;

const updateSecondomer = () => {
  const helperMinutes = minutes.toString().padStart(2, "0");
  const helperSeconds = seconds.toString().padStart(2, "0");
  secondomer.textContent = `${helperMinutes}:${helperSeconds}`;
};

startBtn.addEventListener("click", function () {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.textContent = "START";
  } else {
    startBtn.textContent = "PAUSE";
    intervalId = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        intervalId = null;
        startBtn.textContent = "START";
        
        alarmSound.play().catch(err => console.log("Audio playback error: ", err));
        return;
      }
      if (seconds === 0) {
        seconds = 59;
        minutes--;
      } else {
        seconds--;
      }
      updateSecondomer();
    }, 1000);
  }
});

updateSecondomer();