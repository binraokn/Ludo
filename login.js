// LOGIN SYSTEM - Admin Only
function doLogin() {
  let user = document.getElementById("loginInput").value;
  let pass = document.getElementById("passInput").value;

  let isUsername = (user == "Binrao" && pass == "Khalidks1");
  let isPhone = (user == "03036862873" && pass == "Khalidks1");
  let isGmail = (user == "khalidgafoorkn@gmail" && pass == "Khalidks1");

  if (isUsername || isPhone || isGmail) {
    alert("Welcome Admin Binrao! Login Ho Gaya ❤️");
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("gameBox").style.display = "block";
  } else {
    document.getElementById("loginMsg").innerText = "Galat Login! Binrao / Phone / Gmail + Password Khalidks1 likho";
  }
}

let likes = 0;
function likeGame() {
  likes++;
  document.getElementById("likeCount").innerText = likes;
}
