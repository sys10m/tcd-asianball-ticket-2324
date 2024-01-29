import { barcodeHash } from "./barcodeHash.js";

const nameInput = document.querySelector("#name-input")
const idInput = document.querySelector("#id-input")
const emailInput = document.querySelector("#email-input")
const submitBtn = document.querySelector("#submit-btn")

const overlayEl = document.querySelector("#overlay")

// connect to firebase

function overlayOn() {
    overlayEl.style.display = "block";
}

function overlayOff() {
    overlayEl.style.display = "none";
}

submitBtn.addEventListener("click", function(){
    // add error handling
    let theName = nameInput.value
    let theEmail = emailInput.value
    let theId = idInput.value

    if (theName == "" || theEmail == "" || theId == ""){
        console.log("not allow")
    }
    else{
        let booking = {
            name: theName,
            id: theId,
            email: theEmail,
            barcodeHash: barcodeHash(), // no need to store hash in database
            paid: false,
            revMessage: `${nameInput.value}`
        }

        console.log(booking)
    }
    // add to firebase

    // pop up qr and payment details
    overlayOn()
})