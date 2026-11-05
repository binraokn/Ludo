function openSettings(){ document.getElementById('settingsBox').style.display='flex'; }
function closeSettings(){ document.getElementById('settingsBox').style.display='none'; }
function openStore(){ showOnly('storeBox'); updateCoinsUI(); }
function backToMenu(){ showOnly('mainMenu'); }
function claimDaily(){ if(!currentUser) return; currentUser.coins+=500; updateUserCoins(currentUser.email, currentUser.coins, currentUser.gems); updateCoinsUI(); alert('Daily Reward +500 Coins!'); }
function claimFree(){ if(!currentUser) return; currentUser.coins+=200; updateUserCoins(currentUser.email, currentUser.coins, currentUser.gems); updateCoinsUI(); document.getElementById('storeMsg').innerText='+200 Coins mil gaye!'; }
window.onload=()=>{
  setTimeout(()=>{ showOnly('loginBox'); }, 1200);
  buildBoard(); setDice(1);
  document.querySelectorAll('.char').forEach(ch=>{
    ch.onclick=()=>{ document.querySelectorAll('.char').forEach(x=>x.classList.remove('sel')); ch.classList.add('sel'); };
  });
};
