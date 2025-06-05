import flatpickr from 'flatpickr';
import iziToast from "izitoast";


const startButton = document.querySelector('button[data-start]');
const inputDate = document.getElementById('datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
let userSelectedDate;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (selectedDates[0] <= new Date()) {
        iziToast.error({
            message: 'Please choose a date in the future',
            position: 'topRight'
        });
    } else {
        startButton.disabled = false;
        startButton.addEventListener('click', start)
    }
  },
};

const flatpickrInstance = flatpickr(inputDate, options);

function start() {
    let timerId = setInterval(() => {
        const diff = userSelectedDate - new Date();
        const { days: d, hours: h, minutes: m, seconds: s } = convertMs(diff);

        if (diff <= 0) {
            clearInterval(timerId);
            return;
        }
        
        days.textContent = String(d).padStart(2, '0');
        hours.textContent = String(h).padStart(2, '0');
        minutes.textContent = String(m).padStart(2, '0');
        seconds.textContent = String(s).padStart(2, '0');
    }, 1000);

    startButton.disabled = true;

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



