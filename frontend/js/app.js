// ─── Utility Helpers ──────────────────────

function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function requireAuth() {
  if (!getUser()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function showAlert(containerId, message, type) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.textContent = message;
  el.className = `alert alert-${type} visible`;
  setTimeout(() => { el.classList.remove('visible'); }, 4000);
}

// ─── Form Validation ─────────────────────

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateRequired(value) {
  return value.trim().length > 0;
}

function validateMinLength(value, min) {
  return value.length >= min;
}

function showFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) { error.textContent = message; error.classList.add('visible'); }
}

function clearFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.remove('error');
  if (error) { error.textContent = ''; error.classList.remove('visible'); }
}

// ─── Navbar Dynamic Update ────────────────

function updateNav() {
  const user = getUser();
  const navLinks = document.getElementById('nav-links');
  if (!navLinks) return;

  if (user) {
    navLinks.innerHTML = `
      <a href="dashboard.html">Dashboard</a>
      <a href="courses.html">Courses</a>
      <a href="enrollments.html">My Enrollments</a>
      <span style="color:var(--text-muted);font-size:0.85rem;">Hi, ${user.name.split(' ')[0]}</span>
      <a href="#" id="logout-btn" style="color:var(--danger)">Logout</a>
    `;
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    navLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
  }
}

// Run on every page
document.addEventListener('DOMContentLoaded', updateNav);
