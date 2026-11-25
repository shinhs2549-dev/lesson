/* 안락사 공론장 — 저장소 연결
 * 학급 앱과 같은 Firebase 계정을 저장소로만 빌려 씁니다.
 * 어그로 뉴스 제작소 때 넣어 둔 보안 규칙(fakeNews 아래는 로그인한 기기만 읽고 쓰기)을 그대로 쓰도록
 * 데이터는 fakeNews/_euth/sessions 아래에만 저장합니다. 그래서 Firebase 규칙을 새로 넣을 필요가 없고,
 * 학급 앱 데이터와 어그로 뉴스 수업 목록에는 영향이 없습니다.
 */
(function () {
  var CONFIG = {
    apiKey: "AIzaSyBars-AalN-eZKCjGIOgOqkQ9oCHyDSLqU",
    authDomain: "grade-7class.firebaseapp.com",
    projectId: "grade-7class",
    storageBucket: "grade-7class.firebasestorage.app",
    messagingSenderId: "304110691750",
    appId: "1:304110691750:web:7b7ce68828f538802adb67"
  };
  // 학급 앱 로그인과 섞이지 않도록 이름을 붙인 별도 앱으로 씀
  var app = firebase.initializeApp(CONFIG, 'euth');
  var auth = app.auth();
  var db = app.firestore();

  var ready = new Promise(function (resolve, reject) {
    var off = auth.onAuthStateChanged(function (u) {
      if (u) { off(); resolve(u); }
    });
    auth.signInAnonymously().catch(function (e) { reject(e); });
  });

  function sessions() { return db.collection('fakeNews').doc('_euth').collection('sessions'); }
  function session(code) { return sessions().doc(code); }

  window.EF = {
    db: db,
    auth: auth,
    ready: ready,
    ts: function () { return firebase.firestore.FieldValue.serverTimestamp(); },
    sessions: sessions,
    session: session,
    students: function (code) { return session(code).collection('students'); },
    ratings: function (code) { return session(code).collection('ratings'); },
    isPermission: function (e) { return e && (e.code === 'permission-denied' || /permission/i.test(e.message || '')); }
  };
})();
