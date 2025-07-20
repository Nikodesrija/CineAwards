const token = localStorage.getItem('token');
if (token) {
  fetch('http://localhost:3000/user/profile', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('profileData').innerHTML =
      '<pre>' + JSON.stringify(data.user, null, 2) + '</pre>';
  });
}