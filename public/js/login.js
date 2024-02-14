const loginBtn = document.getElementById('loginBtn');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Could use a regex to enforce email input. Thankfully, HTML gives a
  // input type="email"
  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Incorrect Email/Password.');
    }
  }
};

loginBtn.addEventListener('submit', loginFormHandler);