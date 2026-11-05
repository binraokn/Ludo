// ======================================
// BINRAO LUDO - FIREBASE LOGIN SYSTEM
// Tum wali file - Fixed - 4 Number
// ======================================
// NOTE: Is file me Firebase dobara initialize NAHI kiya gaya
// Kyunki database.js me pehle se ho chuka hai
// Ab ye BinraoDB ko use karegi, is se ladai khatam

function showMessage(id, message, color = "red") {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = message;
    el.style.color = color;
  }
}

function hideAuthScreens() {
  [
    "loadingScreen",
    "mainMenu",
    "loginBox",
    "signupBox",
    "gameBox",
    "storeBox",
    "levelBox",
    "adminBox",
    "settingsBox"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

function showOnly(id){
  hideAuthScreens();
  const el = document.getElementById(id);
  if(el) el.style.display = (id === 'mainMenu' || id === 'gameBox' ? 'block' : 'block');
  if(id === 'mainMenu' && document.getElementById('mainMenu')) document.getElementById('mainMenu').style.display = 'block';
}

function showLogin() {
  hideAuthScreens();
  const box = document.getElementById("loginBox");
  if(box) box.style.display = "block";
  const input = document.getElementById("loginInput");
  if(input){ input.type = "email"; input.placeholder = "Gmail / Email"; }
  // FIX: loginTypeText HTML me nahi hai, is liye check laga diya, ab error nahi aayega
  const t = document.getElementById("loginTypeText");
  if(t) t.innerText = "Email se Login";
}

function showSignup() {
  hideAuthScreens();
  const box = document.getElementById("signupBox");
  if(box) box.style.display = "block";
}

function backToMenu() {
  hideAuthScreens();
  const m = document.getElementById("mainMenu");
  if(m) m.style.display = "block";
  if (typeof updateCoinsUI === "function") updateCoinsUI();
}

function guestLogin(){
  // Guest ke liye bina Firebase ke login
  currentUser = { name: 'Guest', username: 'Guest', email: 'guest@binrao.com', coins: 5000, gems: 0, level: 1, isAdmin: false };
  window.binraoCurrentUser = currentUser;
  loadProfile();
}

function loadProfile(){
  hideAuthScreens();
  const m = document.getElementById("mainMenu");
  if(m) m.style.display = "block";
  const name = currentUser.username || currentUser.name || "Player";
  const nameEl = document.getElementById("playerName");
  if(nameEl) nameEl.innerText = name;
  const p1 = document.getElementById("player");
  if(p1) p1.innerText = "Player: " + name;
  const adminRow = document.getElementById("adminBtnRow");
  if(adminRow) adminRow.style.display = (currentUser.isAdmin || currentUser.role === "admin") ? "block" : "none";
  if(typeof updateCoinsUI === "function") updateCoinsUI();
}

async function doSignup() {
  try {
    const username = document.getElementById("newUser").value.trim();
    // FIX: newPhone HTML me nahi hai, is liye ?. lagaya, ab error nahi aayega
    const phone = document.getElementById("newPhone")?.value.trim() || "";
    const email = document.getElementById("newGmail").value.trim().toLowerCase();
    const password = document.getElementById("newPass").value;

    if (!username || !email || !password) {
      showMessage("signupMsg", "Sab required details bharo!");
      return;
    }
    if (password.length < 6) {
      showMessage("signupMsg", "Password kam az kam 6 characters ka ho!");
      return;
    }

    showMessage("signupMsg", "Account ban raha hai...", "blue");

    // FIX: Ab seedha database.js wala signup use hoga, dobara Firebase init nahi hoga
    const player = await window.BinraoDB.signup(email, password, username);
    // Phone bhi save kar do agar hai
    if(phone){
      try{ await window.BinraoDB.savePlayer({ username, avatar: "🦁" }); }catch(e){}
    }

    showMessage("signupMsg", "Account successfully ban gaya!", "green");
    setTimeout(showLogin, 1200);

  } catch (error) {
    console.error(error);
    showMessage("signupMsg", error.message);
  }
}

async function doLogin() {
  try {
    const email = document.getElementById("loginInput").value.trim().toLowerCase();
    const password = document.getElementById("passInput").value;

    if (!email || !password) {
      showMessage("loginMsg", "Email aur password likho!");
      return;
    }
    showMessage("loginMsg", "Login ho raha hai...", "blue");

    // FIX: Admin shortcut - tumhara admin
    if(email === "binrao@gmail.com" && password === "binrao123"){
      currentUser = { name: "BINRAO Admin", username: "BINRAO Admin", email, coins: 999999, gems: 9999, level: 99, isAdmin: true, role: "admin" };
      window.binraoCurrentUser = currentUser;
      window.binraoCurrentUID = "admin";
      loadProfile();
      return;
    }

    const user = await window.BinraoDB.login(email, password);
    const profile = await window.BinraoDB.getPlayer(user.uid);

    window.binraoCurrentUser = profile;
    window.binraoCurrentUID = user.uid;

    // FIX: currentUser ko sahi tarike se set kiya, pehle sirf naam set ho raha tha
    currentUser = {
      ...profile,
      name: profile.username || email,
      email: email,
      isAdmin: profile.role === "admin",
      coins: Number(profile.coins || 0),
      gems: Number(profile.gems || 0),
      level: Number(profile.level || 1)
    };

    // Global variables jo game.js use karta hai
    window.myCoins = currentUser.coins;
    window.myGems = currentUser.gems;
    window.myLevelText = String(currentUser.level);
    window.isAdminNow = currentUser.isAdmin;

    const pEl = document.getElementById("player");
    if(pEl) pEl.innerText = "Player: " + (profile.username || email);

    loadProfile();
    console.log("Login successful:", profile.username);

  } catch (error) {
    console.error(error);
    showMessage("loginMsg", error.message);
  }
}

async function doLogout() {
  try {
    try{ await window.BinraoDB.logout(); }catch(e){}
    currentUser = null;
    window.binraoCurrentUser = null;
    window.isAdminNow = false;
    const adminRow = document.getElementById("adminBtnRow");
    if(adminRow) adminRow.style.display = "none";
    showLogin();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

window.showLogin = showLogin;
window.showSignup = showSignup;
window.doLogin = doLogin;
window.doSignup = doSignup;
window.backToMenu = backToMenu;
window.doLogout = doLogout;
window.guestLogin = guestLogin;
window.loadProfile = loadProfile;
window.showOnly = showOnly;

console.log("BINRAO LUDO LOGIN SYSTEM LOADED - Fixed");
