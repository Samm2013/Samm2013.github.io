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
            const jsonString = JSON.stringify(userData, null, 2);
            const fs = require('fs');

            fs.writeFile('data.json', jsonString, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
                console.log('Data successfully written to data.json');
            });
            
        } else {
            alert('Please fill in all fields.');
        }
    });
});
