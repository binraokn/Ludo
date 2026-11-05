// GAME LOGIC - Ludo Dice
let playerCoins = database.players[0].coins;
let computerCoins = database.players[1].coins;

document.getElementById("player").innerText = "Binrao | Coins: " + playerCoins + " | VIP: Luxury";
document.getElementById("computer").innerText = "Computer AI | Coins: " + computerCoins;

function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice").innerText = "Dice: " + dice;
  document.getElementById("status").innerText = "Tumne " + dice + " phenka!";

  if (dice == 6) {
    playerCoins += 1000;
    document.getElementById("player").innerText = "Binrao | Coins: " + playerCoins + " | VIP: Luxury";
    document.getElementById("status").innerText = "WAH! 6 Aaya! +1000 Coins Mila!";
  }
}
