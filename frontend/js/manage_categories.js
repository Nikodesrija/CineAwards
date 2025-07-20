async function fetchCategories() {
  const res = await fetch('https://cineawards.onrender.com/category/categories', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  const result = await res.json();

  const container = document.getElementById('categoryList');
  container.innerHTML = '';

  // Create table
  const table = document.createElement('table');
  table.className = 'table table-bordered table-striped table-hover';
  table.innerHTML = `
    <thead class="table-dark">
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Category</th>
        <th>Voting Start</th>
        <th>Voting End</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="categoryTableBody"></tbody>
  `;

  const tbody = table.querySelector('#categoryTableBody');

  result.data.forEach(category => {
    const row = document.createElement('tr');

    const nameCell = `<td>${category.name}</td>`;
    const descCell = `<td>${category.description || '—'}</td>`;
    const parentCell = `<td>${category.group || null}</td>`;
    const startCell = `<td>${category.votingStart ? new Date(category.votingStart).toLocaleString() : '—'}</td>`;
    const endCell = `<td>${category.votingEnd ? new Date(category.votingEnd).toLocaleString() : '—'}</td>`;
    const actionsCell = `

    `;

    row.innerHTML = nameCell + descCell + parentCell + startCell + endCell + actionsCell;
   const actionsTd = document.createElement('td');
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-sm btn-warning w-100 mb-2';
  editBtn.innerHTML = `<i class="bi bi-pencil-square me-1"></i>Edit`;
  editBtn.onclick = () => updateCategory(category._id); // ✅ Connect to updateCategory()

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-danger w-100';
  deleteBtn.innerHTML = `<i class="bi bi-trash me-1"></i>Delete`;
  deleteBtn.onclick = () => deleteCategory(category._id); // ✅ Connect to deleteCategory()

  // Append buttons
  actionsTd.appendChild(editBtn);
  actionsTd.appendChild(deleteBtn);
  row.appendChild(actionsTd);

  tbody.appendChild(row);
});

  container.appendChild(table);
}
function updateCategory(id) {
  const token = localStorage.getItem('token');
  const name = prompt("Enter new category name:");
  const description = prompt("Enter new description:");
  const votingStart = prompt("Enter new voting start (yyyy-mm-ddThh:mm):");
  const votingEnd = prompt("Enter new voting end (yyyy-mm-ddThh:mm):");

  if (name && votingStart && votingEnd) {
    fetch(`https://cineawards.onrender.com/category/category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        name,
        description,
        votingStart,
        votingEnd
      })
    }).then(res => {
      if (res.ok) {
        alert('Category updated');
        fetchCategories();
      } else {
        alert('Update failed');
      }
    });
  }
}
function deleteCategory(id) {
  const token = localStorage.getItem('token');
  if (confirm('Are you sure you want to delete this category?')) {
    fetch(`https://cineawards.onrender.com/category/category/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      if (res.ok) {
        alert('Category deleted');
        fetchCategories();
      } else {
        alert('Delete failed');
      }
    });
  }
}
fetchCategories();
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
loadNotifications();