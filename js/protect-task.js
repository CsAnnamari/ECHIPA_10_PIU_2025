// Generic protection for task pages: redirects if not allowed
(function () {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
  const m = location.pathname.match(/task(\d+)\.html$/i);
  const taskId = m ? parseInt(m[1], 10) : null;
  if (!taskId) return;

  const allowed = currentUser.accessibleTasks || [];
  if (!allowed.includes(taskId)) {
    alert('Nu aveți acces la această sarcină!');
    window.location.href = 'index.html';
  }
})();