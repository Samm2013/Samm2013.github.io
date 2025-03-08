// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.querySelector('form');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input values
        const fullName = document.querySelector('input[placeholder="Full Name"]').value;
        const email = document.querySelector('input[placeholder="Email"]').value;
        const username = document.querySelector('input[placeholder="Username"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Create an object with the user data
        const userData = {
            fullName: fullName,
            email: email,
            username: username,
            password: password
        };

        // Save the user data (in this example, we're using localStorage)
        saveUserData(userData);

        // Clear the form
        form.reset();

        // Inform the user
        alert("Sign up successful!");
    });
});

// Function to save user data
function saveUserData(userData) {
    // In a real application, you would typically send this data to a server
    // For this example, we'll just save it to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
}
