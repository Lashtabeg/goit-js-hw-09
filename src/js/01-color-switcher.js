function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const CHANGE_COLOR_DELAY = 1000;
let timerId = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.body,
};
refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', onStartBtn);
refs.btnStop.addEventListener('click', onStopBtn);

function onStartBtn() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
}

function onStopBtn() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(timerId);
}
