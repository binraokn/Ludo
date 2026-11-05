// ======================================
// BINRAO LUDO - MAIN APP CONTROLLER
// ======================================

(() => {
  "use strict";

  const DB = window.BinraoDB;

  const $ = id => document.getElementById(id);

  function showMessage(message) {
    alert(message);
  }

  function showSection(sectionId) {
    document.querySelectorAll("[data-section]").forEach(section => {
      section.style.display = "none";
    });

    const section = $(sectionId);
    if (section) section.style.display = "block";
  }

  // LOGIN
  window.handleLogin = async function () {
    if (!DB) return showMessage("Database connection missing.");

    const email = $("loginEmail")?.value.trim();
    const password = $("loginPassword")?.value;

    if (!email || !password) {
      return showMessage("Email aur password enter karo.");
    }

    try {
      await DB.login(email, password);
      showMessage("Login successful!");
    } catch (error) {
      showMessage(error.message);
    }
  };

  // SIGNUP
  window.handleSignup = async function () {
    if (!DB) return showMessage("Database connection missing.");

    const email = $("signupEmail")?.value.trim();
    const password = $("signupPassword")?.value;
    const username = $("signupUsername")?.value.trim();

    if (!email || !password || !username) {
      return showMessage("Saari details enter karo.");
    }

    try {
      await DB.signup(email, password, username);
      showMessage("Account created successfully!");
    } catch (error) {
      showMessage(error.message);
    }
  };

  // LOGOUT
  window.handleLogout = async function () {
    if (!DB) return;

    try {
      await DB.logout();
      showMessage("Logout successful.");
    } catch (error) {
      showMessage(error.message);
    }
  };

  // AUTH STATUS
  if (DB) {
    DB.onAuthStateChanged(async user => {
      if (!user) {
        showSection("loginSection");
        return;
      }

      try {
        const player = await DB.getPlayer(user.uid);

        const name = $("playerName");
        if (name) {
          name.textContent = player.username || "Player";
        }

        showSection("homeSection");

        window.currentPlayer = player;
      } catch (error) {
        console.error("Profile error:", error);
        showMessage("Player profile load nahi hua.");
      }
    });
  }

  // NAVIGATION
  window.openHome = () => showSection("homeSection");
  window.openGame = () => showSection("gameSection");
  window.openProfile = () => showSection("profileSection");
  window.openSettings = () => showSection("settingsSection");

  // GAME
  window.startGame = function () {
    showSection("gameSection");

    if (typeof window.rollDice === "function") {
      window.rollDice();
    }
  };

  // SOUND SETTING
  window.toggleSound = function (enabled) {
    localStorage.setItem("binraoSound", enabled ? "on" : "off");
  };

  // INITIAL SETTINGS
  const savedSound = localStorage.getItem("binraoSound");

  if ($("soundCheck")) {
    $("soundCheck").checked = savedSound !== "off";
  }

  console.log("BINRAO LUDO APP INITIALIZED");

})();
