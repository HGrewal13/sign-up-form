
// Define Form and Input Variables------------------------------------------------------------------------------------------------------------------------------------------------
const form = document.querySelector("#signUpForm");
const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

// Functions------------------------------------------------------------------------------------------------------------------------------------------------------------

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
        email.reportValidity();
        return false;
    } else if(email.validity.typeMismatch) {
        const msg = "Please enter in a valid email";
        email.setCustomValidity(msg);
        email.reportValidity();
        return false;
    } else if(!checkEmailProvider(email.value)) {
        const msg = "email must be from: gmail, hotmail, yahoo or outlook";
        email.setCustomValidity(msg);
        email.reportValidity();
        return false;
    } else if(!tldCheck.test(email.value)) {
        const msg = "Must end with .com";
        email.setCustomValidity(msg);
        email.reportValidity();
        return false;
    } else {
        email.setCustomValidity("");
        email.reportValidity();
        return true;
    }
}

// This function takes care of making sure the phone number is only 10 characters long. (12 including dashes)
function phoneFormatting() {
    let tel = phone.value;
    // Replace all instances of "-" to avoid double dashing
    tel = tel.replaceAll("-", "");
    // length of tel is now considered without the "-". This allows the conditions to insert a "-" at the appropriate indexes
    if(tel.length > 3 && tel.length <=6) {
        tel = tel.slice(0,3) + "-" + tel.slice(3);
        console.log(tel);
    } else if(tel.length > 6) {
        tel = tel.slice(0,3) + "-" + tel.slice(3,6) + "-" + tel.slice(6,10);
    }
    phone.value = tel;
}

// checks to see if the the key the user is pressing is a number or backspace. If not, don't allow the input
function checkPhoneEntry(event) {
    let regexNumberCheck = /^[0-9]+$/;
    if(!regexNumberCheck.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
    }
}

function checkPhoneValidity() {
    // phone.checkValidity();
    if(phone.validity.valueMissing) {
        let msg = "Phone number is required.";
        phone.setCustomValidity(msg);
        phone.reportValidity();
        return false;
    } else if(phone.value.length < 12) {
        let msg = "Must be a valid phone number of 10 digits.";
        phone.setCustomValidity(msg);
        phone.reportValidity();
        return false;
    } else {
        phone.setCustomValidity("");
        phone.reportValidity();
        return true;
    }
}

function checkCapitalLetter(password) {
    let val = password.value;
    let capitalLetters = /[A-Z]/;
    let capitalFlag = false;
    if(capitalLetters.test(val)) {
        capitalFlag = true;
    }
    return capitalFlag;
}

function checkForNumber(password) {
    let val = password.value;
    let regexNumberCheck = /[0-9]/;
    let numberFlag = false;
    if(regexNumberCheck.test(val)) {
        numberFlag = true;
    }
    return numberFlag;
}

function checkSymbolInclusion(password) {
    let val = password.value;
    let specialCharacters = ["@","#","!","$"];
    let symbolFlag = false;
    specialCharacters.forEach((symbol) => {
        if(val.includes(symbol)) {
            symbolFlag = true;
        }
    })
    return symbolFlag;
}

function checkPasswordValidity() {
    if(password.validity.valueMissing) {
        let msg = "Password is required.";
        password.setCustomValidity(msg);
        password.reportValidity();
        return false;
    } else if(password.value.length < 4) {
        let msg = "Password must be at least 4 characters long."
        password.setCustomValidity(msg);
        password.reportValidity();
        return false;
    } else if(!checkSymbolInclusion(password) || !checkCapitalLetter(password) || !checkForNumber(password)) {
        let msg = 'Password must contain an uppercase letter, a number, and a special character ("@","#","!","$").'
        password.setCustomValidity(msg);
        password.reportValidity();
        return false;
    }
    else {
        password.setCustomValidity("");
        password.reportValidity();
        return true;
    }
}

function checkConfirmPasswordValidity(pass) {
    if(confirmPassword.value !== password.value) {
        let msg = "Passwords do not match.";
        confirmPassword.setCustomValidity(msg);
        confirmPassword.reportValidity();
        return false;
    } else {
        confirmPassword.setCustomValidity("");
        confirmPassword.reportValidity();
        return true;
    }
}


// EVENT LISTENERS---------------------------------------------------------------------------------------------------------------------------------------------------------

// Need to listen for input changes to ensure valid pseudoclass is active correctly
// fName.addEventListener("input", checkFNameValidity);

// keydown event runs the function to allow only numbers or backspace to be inputted
// After that we will use an input event listener and format the phone number with dashes
phone.addEventListener("keydown", (event) => {checkPhoneEntry(event)});
phone.addEventListener("input", phoneFormatting);

confirmPassword.addEventListener("input", (event) => checkConfirmPasswordValidity(password));

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Called each input validity function in order and if not valid, return so customValidity shows in order
    if(!checkFNameValidity()) return;
    if(!checkLNameValidity()) return;
    if(!checkEmailValidity()) return;
    if(!checkPhoneValidity()) return;
    if(!checkPasswordValidity()) return;
    if(!checkConfirmPasswordValidity()) return;
})






