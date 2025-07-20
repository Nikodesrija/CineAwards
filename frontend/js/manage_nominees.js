async function fetchNominees() {
  const list = document.getElementById('nomineeList');
  list.innerHTML = '<p>Loading nominees...</p>';

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      list.innerHTML = '<p class="text-danger">Unauthorized: Please log in.</p>';
      return;
    }

    const response = await fetch('https://cineawards.onrender.com/nominee/nominees', {
      headers: { Authorization: 'Bearer ' + token }
    });

    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const data = await response.json();
    const nominees = data.data || [];
    list.innerHTML = '';

    if (nominees.length === 0) {
      list.innerHTML = '<p>No nominees found.</p>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'table table-bordered table-hover table-striped';

    const rows = nominees.map(n => `
      <tr>
        <td>${n.name}</td>
        <td>
          ${n.category?.name || '—'}<br>
          <span class="badge bg-secondary">${n.category?.group || '—'}</span>
        </td>
        <td>${n.description || '—'}</td>
        <td>${n.image ? `<img src="${n.image}" width="80" alt="${n.name}" />` : '—'}</td>
        <td>${n.film || '—'}</td>
        <td>${n.role || '—'}</td>
        <td>${n.workTitle || '—'}</td>
        <td>${n.voteCount ?? 0}</td>
        <td>
          <div class="d-flex flex-column gap-2">
            <button class="btn btn-sm btn-warning w-100" onclick="updateNominee('${n._id}')">
              <i class="bi bi-pencil-square me-1"></i>Update
            </button>
            <button class="btn btn-sm btn-danger w-100" onclick="deleteNominee('${n._id}')">
              <i class="bi bi-trash me-1"></i>Delete
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    table.innerHTML = `
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Image</th>
          <th>Film</th>
          <th>Role</th>
          <th>Work Title</th>
          <th>Votes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    `;

    list.appendChild(table);
  } catch (err) {
    console.error('Error loading nominees:', err);
    list.innerHTML = `<p class="text-danger">Error loading nominees. Please try again later.</p>`;
  }
}

function deleteNominee(id) {
  const token = localStorage.getItem('token');
  if (!confirm('Are you sure you want to delete this nominee?')) return;

  fetch(`https://cineawards.onrender.com/nominee/nominee/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(res => {
    if (res.ok) {
      alert('Nominee deleted successfully');
      fetchNominees(); // Reload nominees
    } else {
      alert('Failed to delete nominee');
    }
  });
}
function updateNominee(id) {
  const token = localStorage.getItem('token');

  const name = prompt("Enter updated name:");
  const description = prompt("Enter updated description:");
  const image = prompt("Enter new image URL:");

  if (name && description) {
    fetch(`https://cineawards.onrender.com/nominee/nominee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ name, description, image })
    }).then(res => {
      if (res.ok) {
        alert('Nominee updated successfully');
        fetchNominees(); // Refresh list
      } else {
        alert('Failed to update nominee');
      }
    });
  }
}
fetchNominees();
async function loadNotifications() {
    const icon = document.getElementById('notificationIcon');
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.innerHTML = ''; // Clear existing

    try {
      // Replace with your actual API call
      const res = await fetch('https://cineawards.onrender.com/notifications'); 
      const data = await res.json();

      if (data.length > 0) {
        icon.classList.add('notification-dot');

        data.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<a class="dropdown-item" href="#">${item.message}</a>`;
          dropdown.appendChild(li);
        });
      } else {
        icon.classList.remove('notification-dot');
        dropdown.innerHTML = '<li><span class="dropdown-item text-muted">No notifications</span></li>';
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  }
  let notifications = [];

  async function loadNotifications() {
    const icon = document.getElementById('notificationIcon');
    const countBadge = document.getElementById('notificationCount');
    const dropdown = document.getElementById('notificationDropdown');

    dropdown.innerHTML = '';
    countBadge.style.display = 'none';

    try {
      // Fetch notifications from your API (replace with your actual URL)
      const res = await fetch('https://cineawards.onrender.com/notifications');
      notifications = await res.json();

      if (notifications.length > 0) {
        // Show count
        countBadge.innerText = notifications.length;
        countBadge.style.display = 'inline-block';

        // Render notifications
        notifications.forEach(n => {
          const li = document.createElement('li');
          li.innerHTML = `<a class="dropdown-item" href="#">${n.message}</a>`;
          dropdown.appendChild(li);
        });
      } else {
        dropdown.innerHTML = '<li><span class="dropdown-item text-muted">No notifications</span></li>';
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }

  // Mark as viewed (clear count when dropdown is opened)
  function markNotificationsViewed() {
    const countBadge = document.getElementById('notificationCount');
    countBadge.style.display = 'none';
    // You can also make an API call here to mark them as read in your DB
  }

  window.addEventListener('DOMContentLoaded', loadNotifications);