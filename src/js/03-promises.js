import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  
  return  new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay},Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject({position, delay},  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        
      }
    }, delay);
  });

}

const form = document.querySelector('form');
form.addEventListener('submit', createPromisesAll);


function createPromisesAll(event) {

  event.preventDefault();
  console.clear();

  let delay = +form.delay.value;
  const step = +form.step.value;
  const amount = +form.amount.value;
  const delays = [delay];
  
  for(let i=1;i<amount;i+=1){
    delay+=step;
    delays.push(delay);
  }
  
    delays.map((delay,index)=>{
      createPromise(index+1,delay).then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({position, delay}) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    });
  }


    
  

   
