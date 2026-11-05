// ======================================
// BINRAO LUDO - FIREBASE LOGIN SYSTEM
// ======================================

const firebaseConfig = {
  apiKey: "AIzaSyCWSLFenBlxR4IrBE21-9xj2ho5YLenoko",
  authDomain: "ludu-star-c1b9c.firebaseapp.com",
  projectId: "ludu-star-c1b9c",
  storageBucket: "ludu-star-c1b9c.firebasestorage.app",
  messagingSenderId: "1074036526285",
  appId: "1:107403652628:web:ffdbdb69eb3f0471aead84",
  measurementId: "G-2PD9W2FC5N"
};

let auth;
let db;
let firebaseAppReady = false;

const firebaseReady = (async () => {
  try {
    const appSDK = await import(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"
    );

    const authSDK = await import(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"
    );

    const dbSDK = await import(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
    );

    const app = appSDK.initializeApp(firebaseConfig);

    auth = authSDK.getAuth(app);
    db = dbSDK.getFirestore(app);

    firebaseAppReady = true;
    console.log("BINRAO LUDO Firebase Connected");

    return { authSDK, dbSDK };

  } catch (error) {
    console.error("Firebase Error:", error);
    throw error;
  }
})();

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
    "adminBox"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

function showLogin() {
  hideAuthScreens();

  document.getElementById("loginBox").style.display = "block";

  const input = document.getElementById("loginInput");
  input.type = "email";
  input.placeholder = "Gmail / Email";

  document.getElementById("loginTypeText").innerText =
    "Email se Login";
}

function showSignup() {
  hideAuthScreens();
  document.getElementById("signupBox").style.display = "block";
}

function backToMenu() {
  hideAuthScreens();
  document.getElementById("mainMenu").style.display = "flex";

  if (typeof updateCoinsUI === "function") {
    updateCoinsUI();
  }
}

async function doSignup() {
  try {
    const { authSDK, dbSDK } = await firebaseReady;

    const username =
      document.getElementById("newUser").value.trim();

    const phone =
      document.getElementById("newPhone").value.trim();

    const email =
      document.getElementById("newGmail").value.trim().toLowerCase();

    const password =
      document.getElementById("newPass").value;

    if (!username || !email || !password) {
      showMessage("signupMsg", "Sab required details bharo!");
      return;
    }

    if (password.length < 6) {
      showMessage("signupMsg", "Password kam az kam 6 characters ka ho!");
      return;
    }

    showMessage("signupMsg", "Account ban raha hai...", "blue");

    const result = await authSDK.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = result.user;

    await dbSDK.setDoc(
      dbSDK.doc(db, "users", user.uid),
      {
        uid: user.uid,
        username: username,
        phone: phone,
        email: email,
        coins: 5000,
        gems: 0,
        level: 1,
        role: "player",
        createdAt: dbSDK.serverTimestamp()
      }
    );

    showMessage(
      "signupMsg",
      "Account successfully ban gaya!",
      "green"
    );

    setTimeout(showLogin, 1200);

  } catch (error) {
    console.error(error);
    showMessage("signupMsg", error.message);
  }
}

async function doLogin() {
  try {
    const { authSDK, dbSDK } = await firebaseReady;

    const email =
      document.getElementById("loginInput").value.trim().toLowerCase();

    const password =
      document.getElementById("passInput").value;

    if (!email || !password) {
      showMessage("loginMsg", "Email aur password likho!");
      return;
    }

    showMessage("loginMsg", "Login ho raha hai...", "blue");

    const result = await authSDK.signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = result.user;

    const profileRef = dbSDK.doc(db, "users", user.uid);
    const profileSnap = await dbSDK.getDoc(profileRef);

    if (!profileSnap.exists()) {
      throw new Error("Player profile nahi mila!");
    }

    const profile = profileSnap.data();

    window.binraoCurrentUser = profile;
    window.binraoCurrentUID = user.uid;

    document.getElementById("player").innerText =
      "Player: " + (profile.username || email);

    isAdminNow = profile.role === "admin";
    currentUser = profile.username || email;

    myCoins = Number(profile.coins || 0);
    myGems = Number(profile.gems || 0);
    myLevelText = String(profile.level || 1);

    document.getElementById("adminBtnRow").style.display =
      isAdminNow ? "block" : "none";

    if (typeof updateCoinsUI === "function") {
      updateCoinsUI();
    }

    hideAuthScreens();
    document.getElementById("mainMenu").style.display = "flex";

    console.log("Login successful:", profile.username);

  } catch (error) {
    console.error(error);
    showMessage("loginMsg", error.message);
  }
}

async function doLogout() {
  try {
    const { authSDK } = await firebaseReady;

    await authSDK.signOut(auth);

    currentUser = "";
    isAdminNow = false;

    document.getElementById("adminBtnRow").style.display = "none";

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

console.log("BINRAO LUDO LOGIN SYSTEM LOADED");
