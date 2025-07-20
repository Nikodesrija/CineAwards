const token = localStorage.getItem('token');
if (token) {
  fetch('https://cineawards.onrender.com/user/profile', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('profileData').innerHTML =
      '<pre>' + JSON.stringify(data.user, null, 2) + '</pre>';
  });
}