/* 사이트 공용 시계·타이머 — 오른쪽 아래에 항상 떠 있음.
 * index.html 등에서 <script src="_lib/clock-timer.js" defer></script> 한 줄로 붙임. */
(function(){
  if (document.getElementById('ctPill')) return;
  var st = document.createElement('style');
  st.textContent = ":root{--ct-panel:#fffdf8;--ct-line:#e2ddd2;--ct-ink:#1d2a33;--ct-muted:#55636d;--ct-chip:#f4f1ea;--ct-accent:#1f6f5c;--ct-accent-ink:#ffffff;--ct-ng:#d9572b;--ct-font:\"Pretendard Variable\",Pretendard,\"Malgun Gothic\",\"Apple SD Gothic Neo\",sans-serif}\n.ct-pill{position:fixed;bottom:max(12px,env(safe-area-inset-bottom,0px));right:max(12px,env(safe-area-inset-right,0px));z-index:40;display:flex;align-items:stretch;border-radius:999px;background:var(--ct-panel);border:1.5px solid var(--ct-line);box-shadow:0 4px 16px rgba(0,0,0,.12);overflow:hidden;font-family:var(--ct-font)}\n.ct-pill button{border:0;background:transparent;color:var(--ct-ink);display:flex;align-items:center;gap:6px;padding:7px 13px;font-weight:700;font-size:.98rem;font-variant-numeric:tabular-nums}\n.ct-clock{border-right:1.5px solid var(--ct-line)!important}\n.ct-tbtn.run{background:var(--ct-accent)!important;color:var(--ct-accent-ink)!important}\n.ct-tbtn.warn{background:#d9572b!important;color:#fff!important}\n.ct-tbtn.done{background:var(--ct-ng)!important;color:#fff!important;animation:ctBlink 1s steps(2) infinite}\n@keyframes ctBlink{50%{opacity:.45}}\n\n.ct-panel{position:fixed;bottom:66px;right:max(12px,env(safe-area-inset-right,0px));z-index:41;width:320px;max-width:calc(100vw - 24px);background:var(--ct-panel);border:1.5px solid var(--ct-line);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.2);padding:16px;display:flex;flex-direction:column;gap:12px;font-family:var(--ct-font)}\n.ct-big{font-family:var(--ct-font);font-weight:800;font-size:3.4rem;line-height:1;text-align:center;font-variant-numeric:tabular-nums;color:var(--ct-ink)}\n.ct-big.warn{color:#d9572b}.ct-big.done{color:var(--ct-ng)}\n.ct-sub{text-align:center;color:var(--ct-muted);font-size:.85rem;margin-top:-6px}\n.ct-row{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}\n.ct-row button{border:1.5px solid var(--ct-line);background:var(--ct-chip);color:var(--ct-ink);border-radius:10px;padding:8px 12px;font-weight:700;font-size:.92rem;font-family:var(--ct-font)}\n.ct-row button.on{background:var(--ct-accent);border-color:var(--ct-accent);color:var(--ct-accent-ink)}\n.ct-row .ct-main{flex:1;padding:12px;font-size:1.05rem;background:var(--ct-accent);border-color:var(--ct-accent);color:var(--ct-accent-ink)}\n.ct-row button:disabled{opacity:.4}\n\n.ct-full{position:fixed;inset:0;z-index:60;background:#0f1a22;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vh;font-family:var(--ct-font);padding:16px}\n.ct-full .f-clock{font-size:clamp(18px,3vw,34px);opacity:.75;font-variant-numeric:tabular-nums}\n.ct-full .f-time{font-family:var(--ct-font);font-weight:800;font-size:clamp(90px,24vw,360px);line-height:1;font-variant-numeric:tabular-nums}\n.ct-full .f-time.warn{color:#ffb347}.ct-full .f-time.done{color:#ff6b5c;animation:ctBlink 1s steps(2) infinite}\n.ct-full .f-msg{font-size:clamp(20px,3.4vw,44px);font-weight:800;min-height:1.3em}\n.ct-full .f-bar{width:min(900px,86vw);height:14px;border-radius:7px;background:rgba(255,255,255,.15);overflow:hidden}\n.ct-full .f-bar i{display:block;height:100%;background:#4cc27e;transition:width 1s linear}\n.ct-full .f-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:1vh}\n.ct-full .f-btns button{border:0;border-radius:12px;padding:14px 24px;font-size:clamp(16px,2vw,22px);font-weight:800;background:rgba(255,255,255,.14);color:#fff;font-family:var(--ct-font)}\n.ct-full .f-btns button.pri{background:#4cc27e;color:#0f1a22}\n\n/* 오른쪽 아래 시계·타이머에 가려지지 않게 여백 */\nbody{padding-bottom:72px}\n#viewer .toast{bottom:76px}\n.ct-pill button,.ct-panel button,.ct-full button{cursor:pointer;font-family:var(--ct-font)}\n[hidden].ct-panel,[hidden].ct-full{display:none!important}\n";
  document.head.appendChild(st);
  var box = document.createElement('div');
  box.innerHTML = "<div class=\"ct-pill\" id=\"ctPill\">\n  <button type=\"button\" class=\"ct-clock\" id=\"ctClock\" title=\"시계 크게 보기\">🕐 <span id=\"ctClockTxt\">--:--</span></button>\n  <button type=\"button\" class=\"ct-tbtn\" id=\"ctTbtn\" title=\"타이머\">⏱ <span id=\"ctTbtnTxt\">타이머</span></button>\n</div>\n\n<div class=\"ct-panel\" id=\"ctPanel\" hidden>\n  <div class=\"ct-big\" id=\"ctBig\">10:00</div>\n  <div class=\"ct-sub\" id=\"ctSub\">시간을 고르고 시작하세요</div>\n  <div class=\"ct-row\" id=\"ctPresets\"></div>\n  <div class=\"ct-row\">\n    <button type=\"button\" data-adj=\"-60\">−1분</button>\n    <button type=\"button\" data-adj=\"-10\">−10초</button>\n    <button type=\"button\" data-adj=\"10\">+10초</button>\n    <button type=\"button\" data-adj=\"60\">+1분</button>\n  </div>\n  <div class=\"ct-row\">\n    <button type=\"button\" class=\"ct-main\" id=\"ctGo\">▶ 시작</button>\n    <button type=\"button\" id=\"ctReset\">초기화</button>\n  </div>\n  <div class=\"ct-row\">\n    <button type=\"button\" id=\"ctFullBtn\">⛶ 칠판에 크게 띄우기</button>\n    <button type=\"button\" id=\"ctSound\" class=\"on\">🔔 종료음 켬</button>\n  </div>\n</div>\n\n<div class=\"ct-full\" id=\"ctFull\" hidden>\n  <div class=\"f-clock\" id=\"ctFClock\"></div>\n  <div class=\"f-time\" id=\"ctFTime\">10:00</div>\n  <div class=\"f-bar\"><i id=\"ctFBar\"></i></div>\n  <div class=\"f-msg\" id=\"ctFMsg\"></div>\n  <div class=\"f-btns\">\n    <button type=\"button\" class=\"pri\" id=\"ctFGo\">▶ 시작</button>\n    <button type=\"button\" id=\"ctFReset\">초기화</button>\n    <button type=\"button\" id=\"ctFClose\">작게 보기 (Esc)</button>\n  </div>\n</div>\n\n";
  while (box.firstChild) document.body.appendChild(box.firstChild);
})();
(function(){
  const $ = id => document.getElementById(id);
  const TKEY = 'siteTimer:v1';
  const PRESETS = [3,5,10,15,20,30];
  // 상태: dur(설정 초), end(진행 중일 때 끝나는 시각 ms), left(멈춘 상태의 남은 초), sound
  let T = { dur:600, end:0, left:600, sound:true };
  try { const s = JSON.parse(localStorage.getItem(TKEY)); if(s && s.dur) T = Object.assign(T, s); } catch(e){}
  const save = () => { try { localStorage.setItem(TKEY, JSON.stringify(T)); } catch(e){} };
  let rang = false, fullMode = 'timer';   // fullMode: 'timer' | 'clock'

  const running = () => T.end > 0;
  const remain = () => running() ? Math.max(0, Math.ceil((T.end - Date.now())/1000)) : T.left;
  const fmt = s => { s=Math.max(0,s); const h=Math.floor(s/3600), m=Math.floor(s%3600/60), x=s%60;
    return (h? h+':'+String(m).padStart(2,'0') : m) + ':' + String(x).padStart(2,'0'); };
  const two = n => String(n).padStart(2,'0');
  const DAYS = ['일','월','화','수','목','금','토'];

  /* 종료음 */
  let actx = null;
  function unlockAudio(){ try { if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==='suspended') actx.resume(); } catch(e){} }
  function chime(){
    if(!T.sound || !actx) return;
    try {
      [0, 0.45, 0.9].forEach((t,i)=>{
        const o=actx.createOscillator(), g=actx.createGain();
        o.type='sine'; o.frequency.value = i===2 ? 1046 : 880;
        g.gain.setValueAtTime(0.0001, actx.currentTime+t);
        g.gain.exponentialRampToValueAtTime(0.35, actx.currentTime+t+0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime+t+0.4);
        o.connect(g).connect(actx.destination); o.start(actx.currentTime+t); o.stop(actx.currentTime+t+0.42);
      });
    } catch(e){}
  }

  /* 조작 */
  function start(){
    unlockAudio();
    if(running()) return;
    if(remain()<=0) T.left = T.dur;
    T.end = Date.now() + T.left*1000; rang=false; save(); draw();
  }
  function pause(){ if(!running()) return; T.left = remain(); T.end = 0; save(); draw(); }
  function toggle(){ running() ? pause() : start(); }
  function reset(){ T.end = 0; T.left = T.dur; rang=false; save(); draw(); }
  function setDur(sec){ sec = Math.max(10, Math.min(3*3600, sec)); T.dur = sec; if(!running()) T.left = sec; rang=false; save(); draw(); }
  function adjust(d){
    if(running()){ T.end = Math.max(Date.now()+1000, T.end + d*1000); T.dur = Math.max(T.dur, remain()); }
    else { T.left = Math.max(10, Math.min(3*3600, T.left + d)); T.dur = T.left; }
    rang=false; save(); draw();
  }

  /* 화면 */
  $('ctPresets').innerHTML = PRESETS.map(m=>`<button type="button" data-min="${m}">${m}분</button>`).join('');
  function draw(){
    const now = new Date(), r = remain(), run = running(), done = r<=0 && (run || T.left===0);
    const warn = !done && r<=60 && (run || r<T.dur);
    $('ctClockTxt').textContent = two(now.getHours())+':'+two(now.getMinutes());
    // 알약
    const b = $('ctTbtn'); b.classList.remove('run','warn','done');
    if(done){ b.classList.add('done'); $('ctTbtnTxt').textContent='시간 끝!'; }
    else if(run){ b.classList.add(warn?'warn':'run'); $('ctTbtnTxt').textContent=fmt(r); }
    else if(r<T.dur){ $('ctTbtnTxt').textContent=fmt(r)+' ⏸'; }
    else $('ctTbtnTxt').textContent='타이머';
    // 패널
    const big=$('ctBig'); big.textContent = fmt(r); big.className='ct-big'+(done?' done':warn?' warn':'');
    $('ctSub').textContent = done ? '시간이 끝났어요' : run ? `${fmt(T.dur)} 중 진행 중` : (r<T.dur ? '일시정지' : '시간을 고르고 시작하세요');
    $('ctGo').textContent = run ? '⏸ 일시정지' : (r<T.dur && r>0 ? '▶ 이어서' : '▶ 시작');
    document.querySelectorAll('#ctPresets button').forEach(x=>x.classList.toggle('on', +x.dataset.min*60===T.dur));
    $('ctSound').textContent = T.sound ? '🔔 종료음 켬' : '🔕 종료음 끔'; $('ctSound').classList.toggle('on', T.sound);
    // 크게 보기
    if(!$('ctFull').hidden){
      $('ctFClock').textContent = `${now.getMonth()+1}월 ${now.getDate()}일 ${DAYS[now.getDay()]}요일 · ${two(now.getHours())}:${two(now.getMinutes())}`;
      if(fullMode==='clock'){
        $('ctFTime').textContent = two(now.getHours())+':'+two(now.getMinutes()); $('ctFTime').className='f-time';
        $('ctFClock').textContent = `${now.getMonth()+1}월 ${now.getDate()}일 ${DAYS[now.getDay()]}요일`;
        $('ctFMsg').textContent = ''; $('ctFBar').parentNode.hidden = true;
        $('ctFGo').hidden = $('ctFReset').hidden = true;
      } else {
        $('ctFTime').textContent = fmt(r); $('ctFTime').className='f-time'+(done?' done':warn?' warn':'');
        $('ctFBar').parentNode.hidden = false; $('ctFBar').style.width = (T.dur? r/T.dur*100 : 0)+'%';
        $('ctFMsg').textContent = done ? '⏰ 시간 끝! 펜을 내려놓으세요' : run ? '집중해서 풀어 봐요' : '';
        $('ctFGo').hidden = $('ctFReset').hidden = false;
        $('ctFGo').textContent = run ? '⏸ 일시정지' : (r<T.dur && r>0 ? '▶ 이어서' : '▶ 시작');
      }
    }
    // 끝나는 순간
    if(run && r<=0){ T.end=0; T.left=0; save(); if(!rang){ rang=true; chime(); setTimeout(chime,1600); } }
  }
  function openFull(mode){ fullMode = mode; $('ctFull').hidden=false; $('ctPanel').hidden=true; draw(); }
  function closeFull(){ $('ctFull').hidden=true; }

  $('ctTbtn').addEventListener('click', e=>{ e.stopPropagation(); $('ctPanel').hidden = !$('ctPanel').hidden; draw(); });
  $('ctClock').addEventListener('click', ()=>openFull('clock'));
  $('ctPresets').addEventListener('click', e=>{ const x=e.target.closest('button'); if(x) setDur(+x.dataset.min*60); });
  document.querySelectorAll('#ctPanel [data-adj]').forEach(x=>x.addEventListener('click',()=>adjust(+x.dataset.adj)));
  $('ctGo').addEventListener('click', toggle);
  $('ctReset').addEventListener('click', reset);
  $('ctSound').addEventListener('click', ()=>{ T.sound=!T.sound; if(T.sound) unlockAudio(); save(); draw(); });
  $('ctFullBtn').addEventListener('click', ()=>openFull('timer'));
  $('ctFGo').addEventListener('click', toggle);
  $('ctFReset').addEventListener('click', reset);
  $('ctFClose').addEventListener('click', closeFull);
  document.addEventListener('click', e=>{ if(!$('ctPanel').hidden && !e.target.closest('#ctPanel,#ctPill')) $('ctPanel').hidden=true; });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ if(!$('ctFull').hidden){ closeFull(); e.stopImmediatePropagation(); } else $('ctPanel').hidden=true; } }, true);
  document.addEventListener('pointerdown', unlockAudio, {once:true});

  draw(); setInterval(draw, 250);
})();
