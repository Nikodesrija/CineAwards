// checkAdmin.js
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("You must log in first.");
        window.location.href = "/frontend/login.html";
        return;
    }
     window.token = token;
    console.log('Token found in localStorage:', window.token);
    fetch('http://localhost:3000/user/verify-token', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Token verification failed");
        }
        return res.json();
    })
    .then(data => {
        if (data.role !== 'admin') {
            alert("Access denied. You are not an admin.");
            window.location.href = "/frontend/login.html";
        }
    })
    .catch(err => {
        alert("Session expired or invalid token.");
        window.location.href = "/frontend/login.html";
    });
});
