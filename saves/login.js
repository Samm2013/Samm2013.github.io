// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const form = document.querySelector('form');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input values
        const username = document.querySelector('input[placeholder="Username"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value;

        // Create a JSON object with the login data
        const loginData = {
            username: username,
            password: password,
        };

        // Save the login data in localStorage as a JSON string
        saveLoginData(loginData);

        // Redirect the user to index.html
        window.location.href = 'index.html';
    });
});

// Function to save login data
function saveLoginData(loginData) {
    // Save the JSON object as a string in localStorage
    localStorage.setItem('loginData', JSON.stringify(loginData));
}
