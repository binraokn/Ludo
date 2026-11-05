let loginType = 'user';

function setLoginType(type) {
  loginType = type;
  let text = document.getElementById("loginTypeText");
  let input = document.getElementById("loginInput");
  if (type === 'phone') {
    text.innerText = "Phone se Login";
    input.placeholder = "Phone Number";
  } else if (type === 'gmail') {
    text.innerText = "Gmail se Login";
    input.placeholder = "Gmail";
  } else {
    text.innerText = "Username se Login";
    input.placeholder = "Username";
  }
}

function hideAll() {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("gameBox").style.display = "none";
}

function backToMenu() {
  hideAll();
  document.getElementById("mainMenu").style.display = "flex";
}

function showSignup() {
  hideAll();
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  hideAll();
  document.getElementById("loginBox").style.display = "block";
}

function getUsers() {
  let users = localStorage.getItem("binrao_users");
  if (!users) return [];
  return JSON.parse(users);
}

function doSignup() {
  let user = document.getElementById("newUser").value.trim();
  let phone = document.getElementById("newPhone").value.trim();
  let gmail = document.getElementById("newGmail").value.trim();
  let pass = document.getElementById("newPass").value.trim();
  if (!user || !phone || !gmail || !pass) {
    document.getElementById("signupMsg").innerText = "Sab kuch bharo!";
    return;
  }
  let users = getUsers();
  let exists = users.find(u => u.user === user || u.phone === phone || u.gmail === gmail);
  if (exists) {
    document.getElementById("signupMsg").innerText = "Ye account pehle se hai, Login karo!";
    return;
  }
  users.push({ user: user, phone: phone, gmail: gmail, pass: pass });
  localStorage.setItem("binrao_users", JSON.stringify(users));
  document.getElementById("signupMsg").innerText = "Account ban gaya! Ab Login karo";
  setTimeout(() => { showLogin(); }, 1000);
}

function doLogin() {
  let input = document.getElementById("loginInput").value.trim();
  let pass = document.getElementById("passInput").value.trim();
  if (!input || !pass) {
    document.getElementById("loginMsg").innerText = "Username / Password likho!";
    return;
  }
  let users = getUsers();
  let found = null;
  if (loginType === 'phone') found = users.find(u => u.phone === input && u.pass === pass);
  else if (loginType === 'gmail') found = users.find(u => u.gmail === input && u.pass === pass);
  else found = users.find(u => u.user === input && u.pass === pass);

  if (found) {
    hideAll();
    document.getElementById("gameBox").style.display = "block";
    document.getElementById("player").innerText = "Player: " + found.user;
    document.getElementById("loginMsg").innerText = "";
  } else {
    document.getElementById("loginMsg").innerText = "Galat Login! Pehle Account Banao";
  }
}

// MENU BUTTONS - GOLD
function goPhoneLogin() {
  if (!document.getElementById("agree").checked) { alert("Pehle Terms pe Tick karo!"); return; }
  showLogin();
  setLoginType('phone');
}
function goGmailLogin() {
  if (!document.getElementById("agree").checked) { alert("Pehle Terms pe Tick karo!"); return; }
  showLogin();
  setLoginType('gmail');
}
function goUsernameLogin() {
  if (!document.getElementById("agree").checked) { alert("Pehle Terms pe Tick karo!"); return; }
  showLogin();
  setLoginType('user');
}

window.onload = function() {
  setTimeout(function() {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("mainMenu").style.display = "flex";
  }, 3000);
};
