document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.querySelector('input[placeholder="Username"]').value.trim();
        const password = document.querySelector('input[placeholder="Password"]').value.trim();

        // In a real application, you would validate these credentials against a server
        // For this example, we'll just check if they're not empty
        if (username && password) {
            const userData = {
                username: username,
                // In a real app, never store passwords in localStorage
                // This is just for demonstration
                password: password
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = 'index.html';
        } else {
            alert('Please enter both username and password.');
        }
    });
});
