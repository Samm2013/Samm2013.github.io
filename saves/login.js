// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const form = document.querySelector('form');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input values
        const username = document.querySelector('input[placeholder="Username"]').value.trim();
        const password = document.querySelector('input[placeholder="Password"]').value.trim();

        // Perform basic validation (optional)
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Save login data (for demonstration purposes)
        const loginData = {
            username,
            password,
        };
        localStorage.setItem('loginData', JSON.stringify(loginData));

        // Redirect to index.html
        window.location.href = 'index.html';
    });
});
