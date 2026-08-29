// Shared across all pages: live ticker tape + on-page search filter
function pad(n){return n.toString().padStart(2,'0');}

function tickerFrame(){
  const now = new Date();
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const dateStr = `${days[now.getDay()]} ${pad(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(),0,0)) / 86400000);
  const start = new Date(now.getFullYear(),0,1);
  const week = Math.ceil((((now - start) / 86400000) + start.getDay() + 1) / 7);
  return `${dateStr} · ${timeStr}  —  DAY ${dayOfYear} OF ${now.getFullYear()}  —  WEEK ${week}`;
}

function initTicker(){
  const track = document.getElementById('tapeTrack');
  if(!track) return;
  const render = () => { track.textContent = Array(6).fill(tickerFrame()).join('   •   '); };
  render();
  setInterval(render, 1000);
}

function initToolSearch(){
  const input = document.getElementById('toolSearch');
  if(!input) return;
  const cards = Array.from(document.querySelectorAll('.tool-card'));
  const blocks = Array.from(document.querySelectorAll('.category-block'));
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    cards.forEach(c => {
      const match = c.dataset.name.toLowerCase().includes(q);
      c.style.display = match ? '' : 'none';
    });
    blocks.forEach(b => {
      const anyVisible = Array.from(b.querySelectorAll('.tool-card')).some(c => c.style.display !== 'none');
      b.style.display = anyVisible ? '' : 'none';
    });
  });
}

function initNav(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  const moreBtn = document.getElementById('moreBtn');
  const moreWrap = moreBtn ? moreBtn.closest('.nav-more') : null;
  if(moreBtn && moreWrap){
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = moreWrap.classList.toggle('open');
      moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if(!moreWrap.contains(e.target)){
        moreWrap.classList.remove('open');
        moreBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTicker();
  initToolSearch();
  initNav();
});
