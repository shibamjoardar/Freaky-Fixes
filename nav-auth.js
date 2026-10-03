import { watchAuthState, signOutUser } from "./auth.js";

function renderNavAuth(user) {
  const el = document.getElementById('nav-auth');
  if (!el) return;

  if (user) {
    const firstName = (user.displayName || user.email || 'Account').split(' ')[0];
    el.innerHTML = `
      <a href="dashboard.html">${firstName}</a>
      <button type="button" id="logout-btn" class="btn-link">Log out</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', async () => {
      await signOutUser();
      window.location.href = 'index.html';
    });
  } else {
    el.innerHTML = `
      <a href="login.html">Log in</a>
      <a href="signup.html" class="btn-link-primary">Sign up</a>
    `;
  }
}

watchAuthState(renderNavAuth);
