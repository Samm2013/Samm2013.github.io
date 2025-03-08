document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessage = document.getElementById('welcome-message');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    function updateUserStatus() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.username) {
            welcomeMessage.textContent = `Welcome, ${userData.username}!`;
            loginLink.style.display = 'none';
            logoutLink.style.display = 'inline-block';
        } else {
            welcomeMessage.textContent = '';
            loginLink.style.display = 'inline-block';
            logoutLink.style.display = 'none';
        }
    }

    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('userData');
        updateUserStatus();
    });

    updateUserStatus();
});
