// Ensure logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
  window.location.href = 'login.html';
}

// Hide unauthorized task cards on the menu grid
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.menu-grid');
  if (!grid || !currentUser) return;

  const allowed = new Set(currentUser.accessibleTasks || []);
  const links = grid.querySelectorAll('a.menu-card[href*="task"]');

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const m = href.match(/task(\d+)\.html$/i);
    const id = m ? parseInt(m[1], 10) : null;

    // Map roles to tasks if needed; your requirement already filters by IDs
    if (!id || !allowed.has(id)) {
      link.remove();
    }
  });
});