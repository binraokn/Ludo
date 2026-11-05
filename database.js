// =====================================
// BINRAO LUDO - FIREBASE DATABASE
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

// Player profile location
function profileRef(uid) {
  return db.doc(`users/${uid}/private/profile`);
}

// Create new player
async function signup(email, password, username) {
  const result = await auth.createUserWithEmailAndPassword(
    email,
    password
  );

  const player = {
    uid: result.user.uid,
    username: username,
    coins: 5000,
    gems: 0,
    level: 1,
    avatar: "",
    vip: "Normal",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  await profileRef(result.user.uid).set(player);

  return player;
}

// Login player
async function login(email, password) {
  const result = await auth.signInWithEmailAndPassword(
    email,
    password
  );

  return result.user;
}

// Get player data
async function getPlayer(uid) {
  uid = uid || auth.currentUser?.uid;

  if (!uid) {
    throw new Error("Player login required");
  }

  const snapshot = await profileRef(uid).get();

  if (!snapshot.exists) {
    throw new Error("Player profile not found");
  }

  return snapshot.data();
}

// Update safe profile fields
async function savePlayer(data) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Login required");
  }

  const allowed = {};

  ["username", "avatar", "settings"].forEach(key => {
    if (data[key] !== undefined) {
      allowed[key] = data[key];
    }
  });

  await profileRef(user.uid).update(allowed);
}

// Logout
async function logout() {
  await auth.signOut();
}

// Authentication listener
function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}

// Global database connection
window.BinraoDB = {
  app,
  auth,
  db,
  signup,
  login,
  getPlayer,
  savePlayer,
  logout,
  onAuthStateChanged
};

console.log("BINRAO LUDO DATABASE CONNECTED");
