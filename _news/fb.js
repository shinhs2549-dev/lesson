/* 어그로 뉴스 제작소 — 저장소 연결
 * 학급 앱과 같은 Firebase 계정을 저장소로만 빌려 씁니다.
 * 데이터는 'fakeNews' 칸에만 저장하고, 학급 앱 데이터에는 손대지 않습니다.
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
  var app = firebase.initializeApp(CONFIG, 'fakeNews');
  var auth = app.auth();
  var db = app.firestore();

  var ready = new Promise(function (resolve, reject) {
    var off = auth.onAuthStateChanged(function (u) {
      if (u) { off(); resolve(u); }
    });
    auth.signInAnonymously().catch(function (e) { reject(e); });
  });

  function session(code) { return db.collection('fakeNews').doc(code); }

  window.FN = {
    db: db,
    auth: auth,
    ready: ready,
    ts: function () { return firebase.firestore.FieldValue.serverTimestamp(); },
    session: session,
    students: function (code) { return session(code).collection('students'); },
    ratings: function (code) { return session(code).collection('ratings'); },
    votes: function (code) { return session(code).collection('votes'); },
    // 저장소 권한 오류인지 (보안 규칙이 아직 안 들어간 경우)
    isPermission: function (e) { return e && (e.code === 'permission-denied' || /permission/i.test(e.message || '')); }
  };
})();
