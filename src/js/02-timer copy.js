import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const DELAY = 1000;
const startTime = Date.now();
let choosenTime = null;

const refs = {
  dataInput: document.getElementById('datetime-picker'),
  btnCount: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnCount.disabled = true;

const options = {
  allowInput: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenTime = selectedDates[0].getTime();
    if (startTime < choosenTime) {
      refs.btnCount.disabled = false;
      Notify.success('Success! The clock is settled');
    } else {
      Notify.failure('Please choose a date in the future');
      refs.btnCount.disabled = true;
    }
  },
};

flatpickr('input#datetime-picker', options);

function timerSurface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

const timer = {
  start() {
    setInterval(() => {
      const delta = choosenTime - startTime;
      timerSurface(convertMs(delta));
    }, DELAY);
  },
};

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

refs.btnCount.addEventListener('click', timer.start);
