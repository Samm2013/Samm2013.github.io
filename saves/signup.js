document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();
        const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();
        const email = document.querySelector('input[placeholder="Email"]').value.trim();
        const username = document.querySelector('input[placeholder="Username"]').value.trim();
        const password = document.querySelector('input[placeholder="Password"]').value.trim();
        const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value.trim();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (firstName && lastName && email && username && password) {
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                // In a real app, never store passwords in localStorage
                // This is just for demonstration
                password: password
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = 'https://samm.github.io/saves/home/index.html';
        } else {
            alert('Please fill in all fields.');
        }
    });
});
