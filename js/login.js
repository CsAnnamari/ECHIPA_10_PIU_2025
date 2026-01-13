// Login credentials and access control
const loginCredentials = {
  user: { password: 'user', role: 'child', accessibleTasks: [2, 5] },
  parinte: { password: 'parinte', role: 'parent', accessibleTasks: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12] }
};

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  errorMessage.style.display = 'none';
  errorMessage.textContent = '';

  if (loginCredentials[username] && loginCredentials[username].password === password) {
    const user = {
      username,
      role: loginCredentials[username].role,
      accessibleTasks: loginCredentials[username].accessibleTasks
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'index.html';
  } else {
    errorMessage.textContent = 'Utilizator sau parolă incorect!';
    errorMessage.style.display = 'block';
    document.getElementById('password').value = '';
  }
});