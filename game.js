// =================================
// BINRAO LUDO - GAME ENGINE
// =================================

(function () {
  "use strict";

  let diceOne = 1;
  let diceTwo = 1;
  let sixCount = 0;
  let totalKills = 0;
  let soundEnabled = true;

  let gameSettings = {
    singleDice: true,
    doubleDice: false,
    jota: false,
    kill: true,
    safeHome: true
  };

  const diceFaces = [
    "",
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"
  ];

  function get(id) {
    return document.getElementById(id);
  }

  function updateText(id, value) {
    const el = get(id);
    if (el) el.innerText = value;
  }

  function playDiceSound() {
    if (!soundEnabled) return;

    try {
      const audio = new Audio(
        "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
      );
      audio.play().catch(() => {});
    } catch (error) {}
  }

  function randomDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function updateGameInfo() {
    updateText(
      "extraInfo",
      "Jota: " + (gameSettings.jota ? "ON" : "OFF") +
      " | Kill: " + (gameSettings.kill ? "ON" : "OFF") +
      " | 2 Dice: " + (gameSettings.doubleDice ? "ON" : "OFF") +
      " | Total Kill: " + totalKills
    );
  }

  window.rollDice = function () {
    diceOne = randomDice();
    diceTwo = gameSettings.doubleDice
      ? randomDice()
      : 0;

    playDiceSound();

    if (get("vibCheck")?.checked && navigator.vibrate) {
      navigator.vibrate(100);
    }

    updateText("dice1", diceFaces[diceOne]);

    updateText(
      "dice2",
      diceTwo ? diceFaces[diceTwo] : "❌"
    );

    const total = diceOne + diceTwo;

    updateText(
      "diceNum",
      diceTwo
        ? diceOne + " + " + diceTwo + " = " + total
        : String(diceOne)
    );

    let message = "Tumne dice roll kiya: " + total;

    if (diceOne === 6 || diceTwo === 6) {
      sixCount++;

      message += " 🎉 Chhakka! Extra turn!";

    } else {
      sixCount = 0;
      message += " Ab doosre player ki bari.";
    }

    if (sixCount >= 3) {
      sixCount = 0;
      message = "3 baar 6! Bari khatam.";
    }

    if (gameSettings.doubleDice && diceOne === 6 && diceTwo === 6) {
      message += " DOUBLE SIX!";
    }

    updateText("diceResult", message);

    if (get("killMsg")) {
      updateText(
        "killMsg",
        "Total Dice Rolls: " + totalKills
      );
    }

    updateGameInfo();
  };

  window.diceModeChange = function (mode) {
    if (mode === "one") {
      gameSettings.singleDice = true;
      gameSettings.doubleDice = false;

      if (get("oneDiceCheck")) {
        get("oneDiceCheck").checked = true;
      }

      if (get("twoDiceCheck")) {
        get("twoDiceCheck").checked = false;
      }
    }

    if (mode === "two") {
      gameSettings.doubleDice = true;
      gameSettings.singleDice = false;

      if (get("twoDiceCheck")) {
        get("twoDiceCheck").checked = true;
      }

      if (get("oneDiceCheck")) {
        get("oneDiceCheck").checked = false;
      }
    }

    updateGameInfo();
  };

  window.jotaChange = function () {
    gameSettings.jota = !!get("jotaCheck")?.checked;

    if (gameSettings.jota) {
      gameSettings.doubleDice = false;

      if (get("twoDiceCheck")) {
        get("twoDiceCheck").checked = false;
      }

      if (get("oneDiceCheck")) {
        get("oneDiceCheck").checked = true;
      }
    }

    updateGameInfo();
  };

  window.killChange = function () {
    gameSettings.kill = !!get("killCheck")?.checked;
    updateGameInfo();
  };

  window.saveSettings = function () {
    soundEnabled = !!get("soundCheck")?.checked;
  };

  window.binraoGameSettings = gameSettings;

  document.addEventListener("DOMContentLoaded", function () {
    updateGameInfo();
  });

})();
