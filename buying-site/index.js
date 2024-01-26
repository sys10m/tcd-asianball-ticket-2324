const nameInput = document.querySelector("#name-input")
const idInput = document.querySelector("#id-input")
const submitBtn = document.querySelector("#submit-btn")

// connect to firebase

submitBtn.addEventListener("click", function(){
    // hash function
    let booking = {
        name: nameInput.value,
        id: idInput.value,
        barcodeHash: "test",
        paid: false,
        revMessage: `${nameInput.value}`
    }

    console.log(booking)
})