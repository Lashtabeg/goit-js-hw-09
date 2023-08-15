import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DELAY = 1000;
let currentDate = null;
let choosenDate = null;

const refs = {
  dataInput: document.querySelector('input#datetime-picker'),
  dataBtn: document.querySelector('button[data-start]'),
  countDays: document.querySelector('[data-days]'),
  countHours: document.querySelector('[data-hours]'),
  countMinutes: document.querySelector('[data-minutes]'),
  countSeconds: document.querySelector('[data-seconds]'),
};

refs.dataBtn.addEventListener('click', starCountdown);
refs.dataBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = Date.now();
    choosenDate = selectedDates[0].getTime();
    if (currentDate > choosenDate) {
      Notify.failure('Please choose a date in the future');
      refs.dataBtn.disabled = true;
    } else {
      Notify.success('Success! The clock is settled');
      refs.dataBtn.disabled = false;
    }
  },
};

flatpickr(refs.dataInput, options);

function starCountdown() {
  setInterval(() => {
    currentDate = Date.now();
    const delta = choosenDate - currentDate;
    timerUpdateDate(convertMs(delta));
    refs.dataBtn.disabled = true;
    refs.dataInput.disabled = true;
  }, DELAY);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function timerUpdateDate({ days, hours, minutes, seconds }) {
  refs.countDays.textContent = `${days}`;
  refs.countHours.textContent = `${hours}`;
  refs.countMinutes.textContent = `${minutes}`;
  refs.countSeconds.textContent = `${seconds}`;
}
