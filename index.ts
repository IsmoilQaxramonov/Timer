let secondomer: HTMLDivElement = document.querySelector(
  ".sekundomer"
) as HTMLDivElement;
const startBtn: HTMLButtonElement = document.querySelector(
  ".start-btn"
) as HTMLButtonElement;
const btns = document.querySelectorAll<HTMLButtonElement>("button");
const btnArray = Array.from(btns);

btnArray[0].style.background = "#A44E4E";

let hour: number = 3;
let minutes: number = 0;
let seconds: number = 0;
let intervalId: number | null = null;
const alarmSound = new Audio("./alarm3.wav");
alarmSound.preload = "auto";
alarmSound.volume = 1.0;

const updateSecondomer = () => {
  const helperHour = hour.toString().padStart(2, "0");
  const helperMinutes = minutes.toString().padStart(2, "0");
  const helperSeconds = seconds.toString().padStart(2, "0");
  secondomer.textContent = `${helperHour}:${helperMinutes}:${helperSeconds}`;
};

startBtn.addEventListener("click", function () {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.textContent = "START";
  } else {
    startBtn.textContent = "PAUSE";
    intervalId = setInterval(() => {
      if (hour === 0 && minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        intervalId = null;
        startBtn.textContent = "START";
        alarmSound.play().catch(err => console.log("Audio playback error: ", err));
        return;
      }

      if (seconds === 0) {
        if (minutes === 0) {
          if (hour > 0) {
            hour--;
            minutes = 59;
          }
        } else {
          minutes--;
        }
        seconds = 59;
      } else {
        seconds--;
      }

      updateSecondomer();
    }, 1000);
  }
});

updateSecondomer();