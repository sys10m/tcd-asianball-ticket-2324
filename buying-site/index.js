import { barcodeHash } from "./barcodeHash.js";

const nameInput = document.querySelector("#name-input")
const idInput = document.querySelector("#id-input")
const submitBtn = document.querySelector("#submit-btn")

console.log("run")
// connect to firebase

submitBtn.addEventListener("click", function(){
    // hash function
    let booking = {
        name: nameInput.value,
        id: idInput.value,
        barcodeHash: barcodeHash(),
        paid: false,
        revMessage: `${nameInput.value}`
    }

    console.log(booking)
    // add to firebase

    // pop up qr and payment details

})