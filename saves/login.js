document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.querySelector('input[type="text"]').value.trim();
        const password = document.querySelector('input[type="password"]').value.trim();

        // Retrieve stored user data
        const storedUser = JSON.parse(localStorage.getItem('userData'));

        if (!storedUser) {
            showError('No account found. Please sign up first.');
            return;
        }

        if (username === storedUser.username && password === storedUser.password) {
            // Successful login
            window.location.href = 'index.html';
        } else {
            showError('Invalid username or password');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});
