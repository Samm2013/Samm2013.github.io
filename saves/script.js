// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the welcome message element
    const welcomeMessage = document.getElementById('welcome-message');

    // Retrieve login data from localStorage
    const loginData = JSON.parse(localStorage.getItem('loginData'));

    // Check if loginData exists and has a username
    if (loginData && loginData.username) {
        // Update the welcome message with the username
        welcomeMessage.textContent = `Welcome, ${loginData.username}`;
    } else {
        // Default message if no user is logged in
        welcomeMessage.textContent = 'My GitHub Project';
    }
});
