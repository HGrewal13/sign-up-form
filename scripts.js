console.log("hi");

// Define Input Variables
const form = document.querySelector("#signUpForm");
const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const specialCharacters = ["@","#","!","$"];

const fNameMsg = document.querySelector("#fNameMsg");

function checkFNameValidity() {
    if(fName.validity.valueMissing) {
        const msg = "Please enter your first name";
        fName.setCustomValidity(msg);
        fName.reportValidity();
        return false;
    } else if(fName.validity.tooShort || fName.validity.tooLong) {
        const msg = "Must be between 2 - 15 characters";
        fName.setCustomValidity(msg);
        fName.reportValidity();
        return false;
    } else {
        fName.setCustomValidity("");
        fName.reportValidity();
        return true;
    }
}

function checkLNameValidity() {
    if(lName.validity.valueMissing) {
        const msg = "Please enter your last name";
        lName.setCustomValidity(msg);
        lName.reportValidity();
        return false;
    } else if(lName.validity.tooShort || lName.validity.tooLong) {
        const msg = "Must be between 2 - 15 characters";
        lName.setCustomValidity(msg);
        lName.reportValidity();
        return false;
    } else {
        lName.setCustomValidity("");
        lName.reportValidity();
        return true;
    }
}

// Check whether email is from a reputable email provider 
// This is done purely for the sake of displaying custom validity and regex skills
function checkEmailProvider(val) {
    emailProviderArray = [/gmail/,/hotmail/,/yahoo/,/outlook/];
    let emailFlag = false;
    emailProviderArray.forEach((email) => {
        if(email.test(val)) {
            emailFlag = true;
        }
    })
    return emailFlag;
}

function checkEmailValidity() {
    tldCheck = /.com$/;
    if(email.validity.valueMissing) {
        const msg = "Please enter your email";
        email.setCustomValidity(msg);
        email.reportValidity(msg);
        return false;
    } else if(email.validity.typeMismatch) {
        const msg = "Please enter in a valid email";
        email.setCustomValidity(msg);
        email.reportValidity(msg);
        return false;
    } else if(!checkEmailProvider(email.value)) {
        const msg = "email must be from: gmail, hotmail, yahoo or outlook";
        email.setCustomValidity(msg);
        email.reportValidity(msg);
        return false;
    } else if(!tldCheck.test(email.value)) {
        const msg = "Must end with .com";
        email.setCustomValidity(msg);
        email.reportValidity(msg);
        return false;
    } else {
        email.setCustomValidity("");
        email.reportValidity();
        return true;
    }
}


// Need to listen for input changes to ensure valid pseudoclass is active correctly
// fName.addEventListener("input", checkFNameValidity);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Called each input validity function in order and if not valid, return so customValidity shows in order
    if(!checkFNameValidity()) return;
    if(!checkLNameValidity()) return;
    if(!checkEmailValidity()) return;
})






