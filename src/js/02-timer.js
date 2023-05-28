
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import "flatpickr/dist/flatpickr.min.css";

Notify.init({
    width: '500px',
    fontSize: '25px',
    position: 'center-top',
    timeout: '3000',
    messageMaxLength: 150,
    distance: '20px',
    showOnlyTheLastOne: true,
    warning: {
background: 'rgba(190, 194, 79, 1)',
textColor: '#fff',
childClassName: 'notiflix-notify-warning',
notiflixIconColor: 'rgba(0,0,0,0.2)',
fontAwesomeClassName: 'fas fa-exclamation-circle',
fontAwesomeIconColor: 'rgba(0,0,0,1)',
backOverlayColor: 'rgba(238,191,49,0.2)',
},
})


const startBtn = document.querySelector('[data-start]');
const timerFrame = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const timerLabel = document.querySelectorAll('.label');
console.log(timerFrame);

startBtn.setAttribute('disabled', '');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');



timerFrame.style.display = 'flex';
timerFrame.style.justifyContent = 'space-around';
timerFrame.style.marginTop = '150px';
// timerFrame.style.fontSize = '100px';
timerFrame.style.fontWeight = '600';
timerFrame.style.color = 'blue';
timerFrame.style.border = '10px solid blue';
timerFrame.style.borderRadius = '50px';
timerFrame.style.backgroundColor = 'yellow';

for (let i = 0; i < timerField.length;i+=1){
    timerField[i].style.display = 'flex';
    timerField[i].style.flexDirection = 'column';
    timerField[i].style.alignItems = 'center';
    timerField[i].style.fontSize = '100px';
    timerLabel[i].style.fontSize = '30px';
}
 


const timer = {
    fullTimer: null,
    selectedDatesUnix: null,
    isActive: false,

     onStartTimer() {
    if (timer.isActive) {
        return;
    }
    this.isActive = true;
    const currentDate = new Date();
    const currentDateUnix = currentDate.getTime();
    
         if (timer.selectedDatesUnix < currentDateUnix) {
        Notify.warning('Please choose a date in the future');
           
        return;
    } else {
        let timeSet = this.fullTimer;
        console.log(timeSet);
        const timerId = setInterval(() => {
            timeSet -= 1000;
            startBtn.setAttribute('disabled', '');
            const timerObj = convertMs(timeSet);

            days.textContent = `${timerObj.days}`.padStart(2, '0');
            hours.textContent =  `${timerObj.hours}`.padStart(2, '0');
            minutes.textContent = `${timerObj.minutes}`.padStart(2, '0');
            seconds.textContent = `${timerObj.seconds}`.padStart(2, '0');

            this.getRandomHexColor();   
            seconds.style.color= this.getRandomHexColor();                
            if (timeSet < 1000 && timeSet > 0) {
                clearInterval(timerId);
           }
        }, 1000);
    }
    },
     
      getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
      }

};



const options = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (timer.isActive) {

            return;
        }
         timer.selectedDatesUnix = selectedDates[0].getTime();
         const currentDate = new Date();
         const currentDateUnix = currentDate.getTime();
        
        if (currentDateUnix < timer.selectedDatesUnix) {

            startBtn.removeAttribute('disabled', '');
            timer.fullTimer = timer.selectedDatesUnix - currentDateUnix;
            const timerObj = convertMs(timer.fullTimer);
            
            days.textContent = `${timerObj.days}`.padStart(2, '0');
            hours.textContent =  `${timerObj.hours}`.padStart(2, '0');
            minutes.textContent = `${timerObj.minutes}`.padStart(2, '0');
            seconds.textContent = `${timerObj.seconds}`.padStart(2, '0');
                             

        } else {
            startBtn.setAttribute('disabled', '');
           
            Notify.warning('Please choose a date in the future');
        }
       
       
    }
    
};
 
flatpickr("#datetime-picker", options);
startBtn.addEventListener('click', timer.onStartTimer.bind(timer));

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

