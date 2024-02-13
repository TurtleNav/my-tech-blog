// logout functionality
const logoutBtn = document.getElementById("logoutBtn")

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('logout response -> ', response.json())

  if (response.ok) {
    document.location.replace('/'); // redirect to home page
  } else {
    alert('Error occured while attempting to log out');
  }
};

logoutBtn.ddEventListener('click', logout);