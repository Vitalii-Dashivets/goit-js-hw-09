import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  
  return  new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
        
      }
    }, delay);
  });

}
 let array=[] ;
const form = document.querySelector('form');
form.addEventListener('submit', createPromisesAll);


function createPromisesAll(event) {

  event.preventDefault();
  console.clear();

  let delay = +form.delay.value;
  const step = +form.step.value;
  const amount = +form.amount.value;
  const delays = [delay];
  
  for (let i = 0; i < amount; i += 1) {
   
      delay += step;
      delays.push(delay);
        
      createPromise(i, delays[i]).then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        //  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      
      })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
     
    
    
}

    
  

   
