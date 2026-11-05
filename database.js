// ==========================================
// BINRAO LUDO STAR - FIREBASE DATABASE
// ==========================================

// Firebase SDK ko connect karna
(async function () {
  try {
    const { initializeApp } = await import(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"
    );

    const {
      getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged
    } = await import(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"
    );

    const {
      getFirestore,
      doc,
      setDoc,
      getDoc,
      serverTimestamp
    } = await import(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
    );

    // Tumhara Firebase Configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCWSLFenBlxR4IrBE21-9xj2ho5YLenoko",
      authDomain: "ludu-star-c1b9c.firebaseapp.com",
      projectId: "ludu-star-c1b9c",
      storageBucket: "ludu-star-c1b9c.firebasestorage.app",
      messagingSenderId: "1074036526285",
      appId: "1:1074036526285:web:ffdbdb69eb3f0471aead84",
      measurementId: "G-2PD9W2FC5N"
    };

    // Firebase Initialize
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Account Create
    async function signup(email, password, username) {
      const result = await createUserWithEmailAndPassword(
        auth, email, password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        username: username,
        coins: 5000,
        gems: 0,
        level: 1,
        role: "player",
        createdAt: serverTimestamp()
      });

      return result.user;
    }

    // Account Login
    async function login(email, password) {
      const result = await signInWithEmailAndPassword(
        auth, email, password
      );

      return result.user;
    }

    // Player Data
    async function getPlayer(uid) {
      const result = await getDoc(doc(db, "users", uid));
      return result.exists() ? result.data() : null;
    }

    // Logout
    async function logout() {
      await signOut(auth);
    }

    // Global Database System
    window.BinraoDB = {
      app,
      auth,
      db,
      signup,
      login,
      getPlayer,
      logout,
      onAuthStateChanged
    };

    console.log("BINRAO LUDO STAR Firebase Connected!");

    window.dispatchEvent(new Event("binrao-firebase-ready"));

  } catch (error) {
    console.error("Firebase Error:", error);
    window.BINRAO_FIREBASE_ERROR = error.message;
  }
})();
