// DATABASE - Video Jaisa
let database = {
  players: [
    { name: "Binrao", vip: "Luxury", coins: 10000000000, gems: 10000000000, level: 999, vipLevel: 999, isAdmin: true },
    { name: "Computer AI", vip: "Normal", coins: 1000000, gems: 1000, level: 10, vipLevel: 1, isAdmin: false }
  ]
};
localStorage.setItem("gameDB", JSON.stringify(database));
