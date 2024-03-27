// Function to handle page transition from Login to Signup
function goToSignup(): void {
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');

    if (login && signup) {
        login.style.display = 'none';
        signup.style.display = 'block';
    }
}

// Function to handle page transition from Signup to Login
function goToLogin(): void {
    const login = document.getElementById('login');
    const signup = document.getElementById('signup');

    if (login && signup) {
        login.style.display = 'block';
        signup.style.display = 'none';
    }
}

// Event listeners to trigger page transitions
document.getElementById('goToSignup')?.addEventListener('click', goToSignup);
document.getElementById('goTologin')?.addEventListener('click', goToLogin);
