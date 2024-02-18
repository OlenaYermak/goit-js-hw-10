import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputDelay = document.querySelector('input[name="delay"]');

const form = document.querySelector("form");


form.addEventListener('submit', function(event) {
  event.preventDefault();

    const delay = parseInt(inputDelay.value);


    const state = document.querySelector('[name="state"]:checked').value;
    

  const promise = new Promise((resolve, reject) => {
    if(state === "fulfilled") {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise.then((delay) => {
    iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: "#ffffff",
        backgroundColor: "#59A10D",
        position: "topRight",
          icon: '',
    });
  }).catch((delay) => {
    iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: "#ffffff",
        backgroundColor: "#B51B1B",
        position: "topRight",
         icon: '',
    });
  });
});