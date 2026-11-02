
// Get form and input elements

const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const exhibitionInput = document.getElementById("exhibition");

const successMessage = document.getElementById("successMessage");


// FUNCTION 1: Check whether a field is empty

function isEmpty(value) {
    return value.trim() === "";
}


// FUNCTION 2: Validate email format

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


// FUNCTION 3: Check password strength

function isStrongPassword(password) {
    return password.length >= 8;
}


// FUNCTION 4: Display error message

function showError(id, message) {
    document.getElementById(id).textContent = message;
}


// FUNCTION 5: Clear previous error messages

function clearErrors() {

    const errors = document.querySelectorAll(".error");

    errors.forEach(function(error) {
        error.textContent = "";
    });

    const inputs = document.querySelectorAll("input, select");

    inputs.forEach(function(input) {
        input.classList.remove("invalid");
        input.classList.remove("valid");
    });

    successMessage.style.display = "none";
}


// FUNCTION 6: Validate the complete form

function validateForm() {

    let valid = true;

    clearErrors();

    // NAME VALIDATION

    const name = nameInput.value.trim();

    if (isEmpty(name)) {

        showError("nameError", "Name is required.");
        nameInput.classList.add("invalid");
        valid = false;

    } else if (name.length < 3) {

        showError("nameError", "Name must contain at least 3 characters.");
        nameInput.classList.add("invalid");
        valid = false;

    } else {

        nameInput.classList.add("valid");

    }


    // EMAIL VALIDATION

    const email = emailInput.value.trim();

    if (isEmpty(email)) {

        showError("emailError", "Email address is required.");
        emailInput.classList.add("invalid");
        valid = false;

    } else if (!isValidEmail(email)) {

        showError("emailError", "Please enter a valid email address.");
        emailInput.classList.add("invalid");
        valid = false;

    } else {

        emailInput.classList.add("valid");

    }


    // PASSWORD VALIDATION

    const password = passwordInput.value;

    if (isEmpty(password)) {

        showError("passError", "Password is required.");
        passwordInput.classList.add("invalid");
        valid = false;

    } else if (!isStrongPassword(password)) {

        showError("passError", "Password must contain at least 8 characters.");
        passwordInput.classList.add("invalid");
        valid = false;

    } else {

        passwordInput.classList.add("valid");

    }


    // EXHIBITION VALIDATION

    if (isEmpty(exhibitionInput.value)) {

        showError("exhibitionError", "Please select an exhibition.");
        exhibitionInput.classList.add("invalid");
        valid = false;

    } else {

        exhibitionInput.classList.add("valid");

    }

    return valid;
}


// FORM SUBMISSION EVENT

form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm()) {

        // Invalid form: remain on the page

        successMessage.style.display = "none";

    } else {

        // All validation rules passed

        successMessage.style.display = "block";

        alert("Registration Successful! Welcome to ArtVista.");

        form.reset();

    }

});
