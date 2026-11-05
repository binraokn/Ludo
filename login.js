/* =====================================
   BINRAO LUDO STAR
   LOGIN & SIGNUP SYSTEM
   Local Demo Version
===================================== */

let currentUser = null;

const USERS_KEY = "binrao_users";
const SESSION_KEY = "binrao_session";

// Get saved users
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (error) {
    return [];
  }
}

// Save users
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Hide all screens
function hideAll() {
  const screens = [
    "loginBox",
    "signupBox",
    "mainMenu",
    "gameBox",
    "storeBox",
    "adminBox"
  ];

  screens.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
  });
}

// Show login
function showLogin() {
  hideAll();

  const login = document.getElementById("loginBox");
  if (login) login.style.display = "flex";

  const message = document.getElementById("loginMsg");
  if (message) message.innerText = "";
}

// Show signup
function showSignup() {
  hideAll();

  const signup = document.getElementById("signupBox");
  if (signup) signup.style.display = "block";

  const message = document.getElementById("signupMsg");
  if (message) message.innerText = "";
}

// Show main menu
function showMainMenu() {
  hideAll();

  const menu = document.getElementById("mainMenu");
  if (menu) menu.style.display = "flex";

  const coins = document.getElementById("topCoins");
  const gems = document.getElementById("topGems");

  if (coins) coins.innerText = "7050";
  if (gems) gems.innerText = "89";

  const adminButton = document.getElementById("adminBtnRow");
  if (adminButton) adminButton.style.display = "none";
}

// Signup
function doSignup() {
  const username = document
    .getElementById("newUser").value.trim();

  const phone = document
    .getElementById("newPhone").value.trim();

  const email = document
    .getElementById("newGmail").value.trim().toLowerCase();

  const password = document
    .getElementById("newPass").value;

  const message = document.getElementById("signupMsg");

  if (!username || !phone || !email || !password) {
    message.innerText = "Please fill in all fields!";
    return;
  }

  if (password.length < 6) {
    message.innerText = "Password must be at least 6 characters!";
    return;
  }

  const users = getUsers();

  const exists = users.some(user =>
    user.username.toLowerCase() === username.toLowerCase() ||
    user.phone === phone ||
    user.email === email
  );

  if (exists) {
    message.innerText = "Account already exists. Please login.";
    return;
  }

  users.push({
    username: username,
    phone: phone,
    email: email,
    password: password,
    coins: 7050,
    gems: 89,
    level: 1
  });

  saveUsers(users);

  message.innerText = "Account created! Please login.";

  document.getElementById("newUser").value = "";
  document.getElementById("newPhone").value = "";
  document.getElementById("newGmail").value = "";
  document.getElementById("newPass").value = "";

  showLogin();
}

// Login
function doLogin() {
  const input = document
    .getElementById("loginInput").value.trim();

  const password = document
    .getElementById("passInput").value;

  const message = document.getElementById("loginMsg");

  if (!input || !password) {
    message.innerText = "Enter username and password!";
    return;
  }

  const users = getUsers();

  const user = users.find(item =>
    (
      item.username.toLowerCase() === input.toLowerCase() ||
      item.phone === input ||
      item.email.toLowerCase() === input.toLowerCase()
    ) && item.password === password
  );

  if (!user) {
    message.innerText = "Incorrect login details!";
    return;
  }

  currentUser = user;

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      username: user.username
    })
  );

  document.getElementById("loginInput").value = "";
  document.getElementById("passInput").value = "";

  const level = document.getElementById("levelText");
  if (level) level.innerText = "Level " + user.level;

  showMainMenu();
}

// Back to menu
function backToMenu() {
  if (!currentUser) {
    showLogin();
    return;
  }

  showMainMenu();
}

// Logout
function doLogout() {
  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);

  const settings = document.getElementById("settingsBox");
  if (settings) settings.style.display = "none";

  showLogin();

  const adminButton = document.getElementById("adminBtnRow");
  if (adminButton) adminButton.style.display = "none";
}

// Start with login screen
document.addEventListener("DOMContentLoaded", function() {
  const loading = document.getElementById("loadingScreen");

  if (loading) loading.style.display = "none";

  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);

  showLogin();
});
