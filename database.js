// =====================================
// BINRAO LUDO - FIREBASE DATABASE
// Tum wali file - Fixed
// =====================================

const firebaseConfig = {
  apiKey: "AIzaSyCWSLFenBlxR4IrBE21-9xj2ho5YLenoko",
  authDomain: "ludu-star-c1b9c.firebaseapp.com",
  projectId: "ludu-star-c1b9c",
  storageBucket: "ludu-star-c1b9c.firebasestorage.app",
  messagingSenderId: "1074036526285",
  appId: "1:107403652628:web:ffdbdb69eb3f0471aead84",
  measurementId: "G-2PD9W2FC5N"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const app = firebase.app();

// Offline database cache
db.enablePersistence({ synchronizeTabs: true })
  .catch(error => {
    console.log("Offline cache:", error.code);
  });

// ===== FIX 1: Profile location - سیدھا users/UID =====
// Pehle tum ne users/UID/private/profile rakha tha, ab seedha users/UID hai
// taake login.js aur admin.js is ko dhoond sakein
function profileRef(uid) {
  return db.doc(`users/${uid}`);
}

// Local backup - agar net na ho to bhi game chale
let LOCAL_DB = JSON.parse(localStorage.getItem('binrao_db') || '{}');
function saveLocal(){ localStorage.setItem('binrao_db', JSON.stringify(LOCAL_DB)); }

// Create new player
async function signup(email, password, username) {
  const result = await auth.createUserWithEmailAndPassword(email, password);

  const player = {
    uid: result.user.uid,
    username: username,
    email: email,
    coins: 5000,
    gems: 0,
    level: 1,
    avatar: "🦁",
    vip: "Normal",
    isAdmin: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  await profileRef(result.user.uid).set(player);
  LOCAL_DB[email] = player; saveLocal();

  return player;
}

// Login player
async function login(email, password) {
  const result = await auth.signInWithEmailAndPassword(email, password);
  return result.user;
}

// Get player data
async function getPlayer(uid) {
  uid = uid || auth.currentUser?.uid;
  if (!uid) throw new Error("Player login required");
  const snapshot = await profileRef(uid).get();
  if (!snapshot.exists) throw new Error("Player profile not found");
  return snapshot.data();
}

// ===== FIX 2: Coins / Gems bhi update honge =====
// Pehle sirf username, avatar, settings tha, ab coins, gems, level bhi hai
async function savePlayer(data) {
  const user = auth.currentUser;
  if (!user) throw new Error("Login required");
  const allowed = {};
  ["username", "avatar", "settings", "coins", "gems", "level", "vip"].forEach(key => {
    if (data[key] !== undefined) allowed[key] = data[key];
  });
  await profileRef(user.uid).update(allowed);
  // Local bhi update
  if (user.email && LOCAL_DB[user.email]) {
    Object.assign(LOCAL_DB[user.email], allowed); saveLocal();
  }
}

// ===== Ye functions login.js / admin.js ke liye chahiye thay, ye missing thay =====
// Email se player dhoondna - Admin ke liye
async function getUserFromDB(email) {
  if (LOCAL_DB[email]) return LOCAL_DB[email];
  try {
    const snap = await db.collection("users").where("email", "==", email).limit(1).get();
    if (!snap.empty) return snap.docs[0].data();
  } catch(e){ console.log(e); }
  return null;
}
async function saveUserToDB(email, data) {
  LOCAL_DB[email] = data; saveLocal();
  if (data.uid) {
    try{ await profileRef(data.uid).set(data, {merge:true}); }catch(e){ console.log(e); }
  }
}
async function updateUserCoins(email, coins, gems) {
  if (LOCAL_DB[email]) { LOCAL_DB[email].coins = coins; LOCAL_DB[email].gems = gems; saveLocal(); }
  try {
    const snap = await db.collection("users").where("email", "==", email).limit(1).get();
    if (!snap.empty) await snap.docs[0].ref.update({coins, gems});
  } catch(e){ console.log(e); }
}

// ===== FIX 3: Admin Transfer - Ye bilkul missing tha =====
async function transferCoins(toEmail, coins, gems) {
  const u = await getUserFromDB(toEmail);
  if (!u) throw new Error("Player nahi mila!");
  const newCoins = (u.coins || 0) + coins;
  const newGems = (u.gems || 0) + gems;
  await updateUserCoins(toEmail, newCoins, newGems);
  // History bhi save karo
  try {
    await db.collection("transfers").add({
      to: toEmail,
      coins, gems,
      by: auth.currentUser ? auth.currentUser.email : "admin",
      at: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e){}
  return {coins: newCoins, gems: newGems};
}

// Logout
async function logout() {
  await auth.signOut();
}

// Authentication listener
function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}

// Global variables - baaki files in ko use karengi
let currentUser = null;
let diceMode = 1;
let micOn = true;

// Global database connection
window.BinraoDB = {
  app,
  auth,
  db,
  signup,
  login,
  getPlayer,
  savePlayer,
  getUserFromDB,
  saveUserToDB,
  updateUserCoins,
  transferCoins,
  logout,
  onAuthStateChanged
};

console.log("BINRAO LUDO DATABASE CONNECTED - Fixed");
