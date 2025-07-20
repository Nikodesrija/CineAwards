document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    currentPassword: form.currentPassword.value,
    newPassword: form.newPassword.value
  };
  const token = localStorage.getItem('token');
  const res = await fetch('https://cineawards.onrender.com/user/profile/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if (res.ok) {
    alert('Password changed successfully!');
  } else {
    alert('Error: ' + result.error);
  }
});