function openAdmin(){ showOnly('adminBox'); }
async function doTransfer(){
  let to=document.getElementById('transferTo').value.trim();
  let c=parseInt(document.getElementById('transferCoins').value||0);
  let g=parseInt(document.getElementById('transferGems').value||0);
  let u = await getUserFromDB(to);
  if(!u){ document.getElementById('transferMsg').innerText='Player nahi mila!'; return; }
  u.coins += c; u.gems += g;
  await saveUserToDB(to, u);
  document.getElementById('transferMsg').innerText='Transfer ho gaya: '+c+' Coins, '+g+' Gems to '+to;
  document.getElementById('transferHistory').innerHTML += '<p>'+to+' - '+c+' Coins, '+g+' Gems</p>';
}
