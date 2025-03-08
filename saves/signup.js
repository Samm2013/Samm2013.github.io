// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const form = document.querySelector('form');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input values
        const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();
        const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();
        const email = document.querySelector('input[placeholder="Email"]').value.trim();
        const username = document.querySelector('input[placeholder="Username"]').value.trim();
        const password = document.querySelector('input[placeholder="Password"]').value.trim();
        const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value.trim();

        // Validate passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return; // Stop further execution
        }

        // Create a JSON object with the signup data
        const signupData = {
            firstName,
            lastName,
            email,
            username,
            password,
        };

        // Save the signup data in localStorage as a JSON string
        saveSignupData(signupData);

        // Redirect the user to index.html
        window.location.href = 'index.html';
    });
});

// Function to save signup data
function saveSignupData(signupData) {
    // Save the JSON object as a string in localStorage
    localStorage.setItem('signupData', JSON.stringify(signupData));
}
