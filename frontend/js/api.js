const API_BASE = 'http://localhost:5000/api';

// ─── Auth API ─────────────────────────────
async function registerStudent(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function loginStudent(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ─── Course API ───────────────────────────
async function getCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  return res.json();
}

async function getCourseById(id) {
  const res = await fetch(`${API_BASE}/courses/${id}`);
  return res.json();
}

// ─── Enrollment API ───────────────────────
function getAuthHeaders() {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user?.token}`
  };
}

async function enrollInCourse(courseId) {
  const res = await fetch(`${API_BASE}/enrollments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ courseId })
  });
  return res.json();
}

async function getMyEnrollments() {
  const res = await fetch(`${API_BASE}/enrollments`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

async function unenrollFromCourse(enrollmentId) {
  const res = await fetch(`${API_BASE}/enrollments/${enrollmentId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return res.json();
}
