// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.querySelector('form');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input values
        const username = document.querySelector('input[placeholder="Username"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value;

        // Create an object with the login data
        const loginData = {
            username: username,
            password: password
        };

        // Save the login data
        saveLoginData(loginData);

        // Clear the form
        form.reset();

        // Inform the user
        alert("Login credentials saved!");
    });
});

// Function to save login data
function saveLoginData(loginData) {
    // In a real application, you would typically send this data to a server for authentication
    // For this example, we'll just save it to localStorage
    localStorage.setItem('loginData', JSON.stringify(loginData));
}
