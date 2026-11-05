function setDice(n){
  diceMode=n;
  document.getElementById('oneDiceCheck').checked=(n===1);
  document.getElementById('twoDiceCheck').checked=(n===2);
  document.getElementById('oneDiceCheckSettings').checked=(n===1);
  document.getElementById('twoDiceCheckSettings').checked=(n===2);
  document.getElementById('dice2').style.opacity=(n===1?'0.3':'1');
}
function startGame(mode){
  showOnly('gameBox');
  buildBoard();
  document.getElementById('status').innerText='Game Start: '+mode+' - Roll karo!';
  if(mode==='online') document.getElementById('status').innerText='Online Room - Players ka wait ho raha hai...';
}
function buildBoard(){
  let grid=document.getElementById('boardGrid'); grid.innerHTML='';
  for(let r=0;r<15;r++){
    for(let c=0;c<15;c++){
      let div=document.createElement('div'); div.className='cell';
      if(r<6 && c<6) div.style.background='#2ecc71';
      if(r<6 && c>8) div.style.background='#f1c40f';
      if(r>8 && c<6) div.style.background='#e74c3c';
      if(r>8 && c>8) div.style.background='#3498db';
      if(c==7 && r>=1 && r<=5) div.style.background='#f1c40f';
      if(r==7 && c>=9 && c<=13) div.style.background='#3498db';
      if(c==7 && r>=9 && r<=13) div.style.background='#e74c3c';
      if(r==7 && c>=1 && c<=5) div.style.background='#2ecc71';
      if((r==2&&c==6)||(r==6&&c==2)||(r==8&&c==12)||(r==12&&c==8)) div.innerText='★';
      if(([2,3].includes(r) && [2,3].includes(c)) || ([2,3].includes(r) && [11,12].includes(c)) || ([11,12].includes(r) && [2,3].includes(c)) || ([11,12].includes(r) && [11,12].includes(c))){ div.style.background='rgba(0,0,0,0.18)'; div.style.borderRadius='50%'; }
      grid.appendChild(div);
    }
  }
  addToken(11,2,'🚜'); addToken(12,8,'🚜'); addToken(11,7,'🚜');
  addToken(2,11,'🟡'); addToken(3,12,'🟡'); addToken(1,10,'🟡');
}
function addToken(r,c,emoji){
  let idx=r*15+c; let cell=document.getElementById('boardGrid').children[idx];
  let t=document.createElement('div'); t.className='token'; t.innerText=emoji;
  t.onclick=()=>{ alert('Goti chali!'); };
  cell.appendChild(t);
}
function rollDice(){
  let d1=Math.floor(Math.random()*6)+1; let d2=Math.floor(Math.random()*6)+1;
  document.getElementById('dice1').innerText=d1;
  document.getElementById('dice2').innerText=diceMode===2?d2:'-';
  document.getElementById('status').innerText='Dice Aya: '+d1+(diceMode===2?' + '+d2:'')+' - Ab goti par dabao';
}
function toggleMic(el){ if(el) el.innerText = el.innerText==='🎙️'?'🔇':'🎙️'; }
function toggleMainMic(){ micOn=!micOn; document.getElementById('micSide').style.opacity=micOn?'1':'0.5'; alert(micOn?'Mic ON':'Mic OFF'); }
