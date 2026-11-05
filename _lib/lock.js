/* 학생 명단 잠금 해제 도우미
 * 명단은 비밀번호로 암호화된 파일(_명단.enc.json)로만 올라가 있고,
 * 칠판에서 비밀번호를 한 번 입력하면 그 칠판(브라우저)이 열쇠를 기억합니다.
 *
 * 사용법: RosterLock.open('_명단.enc.json').then(function(data){ ... });
 */
(function(){
  var ITER_DEFAULT = 200000;

  function b64(buf){ var s='', b=new Uint8Array(buf); for (var i=0;i<b.length;i++) s+=String.fromCharCode(b[i]); return btoa(s); }
  function unb64(s){ var t=atob(s), b=new Uint8Array(t.length); for (var i=0;i<t.length;i++) b[i]=t.charCodeAt(i); return b; }
  function ls(k, v){
    try {
      if (v === undefined) return localStorage.getItem(k);
      if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
    } catch(e){ return null; }
  }

  function deriveKey(password, salt, iter){
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
      .then(function(base){
        return crypto.subtle.deriveKey(
          { name:'PBKDF2', salt:salt, iterations:iter, hash:'SHA-256' },
          base, { name:'AES-GCM', length:256 }, true, ['encrypt','decrypt']);
      });
  }
  function decryptWith(key, box){
    return crypto.subtle.decrypt({ name:'AES-GCM', iv:unb64(box.iv) }, key, unb64(box.ct))
      .then(function(plain){ return JSON.parse(new TextDecoder().decode(plain)); });
  }
  // keepSalt: 비밀번호를 그대로 쓸 때 기존 salt를 넘기면 열쇠가 같아져서 칠판에서 다시 묻지 않음
  function encrypt(data, password, iter, keepSalt){
    iter = iter || ITER_DEFAULT;
    var salt = keepSalt ? unb64(keepSalt) : crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return deriveKey(password, salt, iter).then(function(key){
      var plain = new TextEncoder().encode(JSON.stringify(data));
      return crypto.subtle.encrypt({ name:'AES-GCM', iv:iv }, key, plain);
    }).then(function(ct){
      return { v:1, iter:iter, salt:b64(salt), iv:b64(iv), ct:b64(ct) };
    });
  }

  function storeKeyName(box){ return 'rosterKey:' + box.salt; }

  function storedKey(box){
    var raw = ls(storeKeyName(box));
    if (!raw) return Promise.reject(new Error('nokey'));
    return crypto.subtle.importKey('raw', unb64(raw), 'AES-GCM', true, ['encrypt','decrypt']);
  }
  function tryStored(box){
    return storedKey(box)
      .then(function(key){ return decryptWith(key, box); })
      .catch(function(e){ if (!e || e.message !== 'nokey') ls(storeKeyName(box), null); throw e; });
  }

  // 편집기용: 이 기기에 기억된 열쇠(또는 비밀번호)로 열고, 같은 열쇠로 다시 잠글 수 있게 key도 돌려줌
  function openForEdit(box, pw){
    var keyP = pw ? deriveKey(pw, unb64(box.salt), box.iter || ITER_DEFAULT) : storedKey(box);
    return keyP.then(function(key){
      return decryptWith(key, box).then(function(data){ return { data:data, key:key }; });
    });
  }
  // 같은 열쇠·같은 salt로 다시 잠그기 → 칠판에서 비밀번호를 다시 묻지 않음
  function reencrypt(data, key, oldBox){
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var plain = new TextEncoder().encode(JSON.stringify(data));
    return crypto.subtle.encrypt({ name:'AES-GCM', iv:iv }, key, plain).then(function(ct){
      return { v:1, iter:oldBox.iter || ITER_DEFAULT, salt:oldBox.salt, iv:b64(iv), ct:b64(ct) };
    });
  }

  function unlockWithPassword(box, pw, remember){
    return deriveKey(pw, unb64(box.salt), box.iter || ITER_DEFAULT).then(function(key){
      return decryptWith(key, box).then(function(data){
        if (remember){
          crypto.subtle.exportKey('raw', key).then(function(raw){ ls(storeKeyName(box), b64(raw)); });
        }
        return data;
      });
    });
  }

  /* ---------- 잠금 화면 ---------- */
  var CSS = ''
    + '#rl-ov{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;'
    + 'background:#1d2a33;font-family:"Pretendard Variable",Pretendard,"Malgun Gothic","Apple SD Gothic Neo",sans-serif;color:#1d2a33;padding:16px}'
    + '#rl-ov .box{background:#fffdf8;border-radius:22px;padding:34px 30px 28px;width:100%;max-width:420px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.35)}'
    + '#rl-ov .ic{font-size:44px;line-height:1}'
    + '#rl-ov h2{margin:10px 0 6px;font-size:24px;letter-spacing:-.02em}'
    + '#rl-ov p{margin:0 0 20px;color:#55636d;font-size:15px;line-height:1.6}'
    + '#rl-ov input[type=password]{width:100%;height:58px;border-radius:14px;border:2px solid #e2ddd2;font-size:22px;text-align:center;padding:0 14px;font-family:inherit;letter-spacing:.1em}'
    + '#rl-ov input[type=password]:focus{outline:none;border-color:#1f6f5c}'
    + '#rl-ov label{display:flex;gap:8px;align-items:center;justify-content:center;margin:14px 0 18px;color:#55636d;font-size:15px}'
    + '#rl-ov label input{width:20px;height:20px}'
    + '#rl-ov button{width:100%;height:58px;border:0;border-radius:14px;background:#1f6f5c;color:#fff;font-size:20px;font-weight:700;font-family:inherit;cursor:pointer}'
    + '#rl-ov button[disabled]{opacity:.6}'
    + '#rl-ov .err{color:#d9572b;font-weight:700;min-height:22px;margin-top:12px;font-size:15px}';

  function showLock(box, resolve){
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var ov = document.createElement('div'); ov.id = 'rl-ov';
    ov.innerHTML = '<form class="box" autocomplete="off">'
      + '<div class="ic">🔒</div><h2>학생 명단 잠금</h2>'
      + '<p>비밀번호를 입력하면 명단이 열립니다.<br>이 칠판에서는 다음부터 묻지 않아요.</p>'
      + '<input type="password" id="rl-pw" placeholder="비밀번호" autocomplete="off">'
      + '<label><input type="checkbox" id="rl-rem" checked> 이 기기에서 기억하기</label>'
      + '<button type="submit" id="rl-go">열기</button>'
      + '<div class="err" id="rl-err"></div></form>';
    document.body.appendChild(ov);
    var pw = ov.querySelector('#rl-pw'), go = ov.querySelector('#rl-go'), err = ov.querySelector('#rl-err');
    setTimeout(function(){ pw.focus(); }, 50);
    ov.querySelector('form').addEventListener('submit', function(e){
      e.preventDefault();
      if (!pw.value) return;
      go.disabled = true; go.textContent = '확인 중…'; err.textContent = '';
      unlockWithPassword(box, pw.value, ov.querySelector('#rl-rem').checked).then(function(data){
        ov.remove(); st.remove(); resolve(data);
      }).catch(function(){
        go.disabled = false; go.textContent = '열기';
        err.textContent = '비밀번호가 맞지 않아요.'; pw.select();
      });
    });
  }

  function fail(msg){
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;z-index:99999;display:grid;place-items:center;background:#1d2a33;color:#fff;font:600 20px/1.6 sans-serif;text-align:center;padding:24px';
    d.textContent = msg;
    document.body.appendChild(d);
  }

  function open(url){
    return new Promise(function(resolve){
      if (!window.crypto || !crypto.subtle){
        fail('이 브라우저에서는 명단 잠금을 풀 수 없어요. (https 주소로 접속했는지 확인해 주세요)');
        return;
      }
      fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + 't=' + Date.now(), { cache:'no-store' })
        .then(function(r){ if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function(box){
          tryStored(box).then(resolve).catch(function(){ showLock(box, resolve); });
        })
        .catch(function(){ fail('명단 파일을 불러오지 못했어요. 인터넷 연결을 확인하고 새로고침해 주세요.'); });
    });
  }

  function forget(){
    try {
      Object.keys(localStorage).forEach(function(k){ if (k.indexOf('rosterKey:') === 0) localStorage.removeItem(k); });
    } catch(e){}
  }

  window.RosterLock = { open:open, encrypt:encrypt, unlockWithPassword:unlockWithPassword,
    openForEdit:openForEdit, reencrypt:reencrypt, forget:forget };
})();
