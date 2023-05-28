const startBtn=document.querySelector('[data-start]');
const stopBtn=document.querySelector('[data-stop]');
const bodyEl=document.querySelector('body');


startBtn.addEventListener('click', onShowStart);
stopBtn.addEventListener('click', onShowStop);
stopBtn.setAttribute('disabled','');
let timerId=null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onShowStart(){
    startBtn.setAttribute('disabled','');
    stopBtn.removeAttribute('disabled','');
    timerId=setInterval(()=>{
    let newColor=getRandomHexColor();
    bodyEl.style.backgroundColor=newColor;
    
    },1000);

}

function onShowStop(){
startBtn.removeAttribute('disabled','');
stopBtn.setAttribute('disabled','');
clearInterval(timerId);
}