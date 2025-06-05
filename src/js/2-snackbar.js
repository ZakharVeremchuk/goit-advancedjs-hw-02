import iziToast from "izitoast";

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const delayValue = Number(form.elements.delay.value)
    const radioValue = form.elements.state.value
    const promise  = new Promise((resolve, reject) => {
        if (radioValue === 'fulfilled') {
            resolve(delayValue)
        } else {
            reject(delayValue)
        }
     }, delayValue);


     promise.then(delay => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
        });
     }).catch(delay => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
         });
     })
};
