function doLogin() {
  let input = document.getElementById("loginInput").value.trim();
  let pass = document.getElementById("passInput").value.trim();
  if (!input || !pass) {
    document.getElementById("loginMsg").innerText = "Username / Password likho!";
    return;
  }

  // ===== ADMIN LOGIN - Tumhara Apna Account =====
  // Yahan apna Admin Username aur Password likho
  // Isko kisi ko mat bhejo, sirf tumhe pata hona chahiye
  let ADMIN_USER = "APNA_ADMIN_USERNAME_YAHAN_LIKHO";
  let ADMIN_PASS = "APNA_ADMIN_PASSWORD_YAHAN_LIKHO";

  if (input === ADMIN_USER && pass === ADMIN_PASS) {
    hideAll();
    document.getElementById("gameBox").style.display = "block";
    document.getElementById("player").innerText = "Player: Admin - Binrao 👑";
    document.getElementById("loginMsg").innerText = "";
    return;
  }

  // ===== NORMAL USER LOGIN =====
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
