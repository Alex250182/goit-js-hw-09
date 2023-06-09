import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

const btnStart = document.querySelector('button[data-start]')
const valueOfDays = document.querySelector('span[data-days]')
const valueOfHours = document.querySelector('span[data-hours]')
const valueOfMinutes = document.querySelector('span[data-minutes]')
const valueOfSeconds = document.querySelector('span[data-seconds]')


btnStart.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      alert('Please choose a date in the future');
    }
  },
};

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
  return String(value).padStart(2, 0);
}

function onTimerStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    btnStart.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimerFace(convertMs(countdown));
  }, 1_000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  valueOfDays.textContent = addLeadingZero(days);
  valueOfHours.textContent = addLeadingZero(hours);
  valueOfMinutes.textContent = addLeadingZero(minutes);
  valueOfSeconds.textContent = addLeadingZero(seconds);
}

const fp = flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onTimerStart);