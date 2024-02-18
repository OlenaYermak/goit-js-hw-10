
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");



let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.show({
        title: "Error",
    titleColor: "#ffffff",
        messageColor: "#ffffff",
        message: "Please choose a date in the future", 
        backgroundColor: "#B51B1B",
        position: "topRight",
       
      })
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePicker, options);



const timerFields = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};


let countdownInterval;

function startCountdown(endDate) {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = endDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      disableInputs(false);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    updateTimerFields(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerFields(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}



function disableInputs(disabled) {
  datePicker.disabled = disabled;
  startBtn.disabled = disabled;
}



startBtn.addEventListener("click", () => {
 userSelectedDate = datePicker._flatpickr.selectedDates[0];

  if (userSelectedDate) {
    disableInputs(true);
    startCountdown(userSelectedDate);
  } 
});