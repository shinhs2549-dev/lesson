/* 어그로 뉴스 제작소 — 수업 내용(문제, 정답, 해설)
 * 학생 페이지(_news/index.html)와 교사 페이지(사회문제탐구/어그로 뉴스 제작소.html)가 함께 씁니다.
 * 기사와 수치는 모두 수업용 가상 자료입니다.
 */
window.NEWS = {
  // <보기> 통계 속임수 6가지 (짧은 것부터)
  tricks: [
    { id: 'a', mark: 'ㄱ', label: '표본 편향' },
    { id: 'b', mark: 'ㄴ', label: '상대위험만 강조' },
    { id: 'c', mark: 'ㄷ', label: '그래프 축 자르기' },
    { id: 'd', mark: 'ㄹ', label: '절대 수와 비율 혼동' },
    { id: 'e', mark: 'ㅁ', label: '유리한 기준 시점 고르기' },
    { id: 'f', mark: 'ㅂ', label: '상관관계를 인과관계로 착각' }
  ],
  // 활동 2의 부풀린 제목 단서
  clues: [
    { id: 'x', label: '과장된 단어' },
    { id: 'y', label: '자료에 없는 말' },
    { id: 'z', label: '작은 변화를 큰일처럼 표현' }
  ],

  // 활동 1. 이 기사, 무엇이 수상한가?
  q1: [
    {
      key: 'A',
      title: '가람시 교통사고, 나래시의 3배… "전국에서 가장 위험한 도시"',
      body: '지난해 가람시에서 발생한 교통사고는 1,800건으로, 이웃 나래시(600건)의 3배에 달했다. 가람시 인구는 약 90만 명, 나래시 인구는 약 20만 명이다. 전문가들은 "가람시 도로가 한계에 이르렀다"고 입을 모았다.',
      answer: 'd',
      explain: '인구 10만 명당 사고는 가람시 200건, 나래시 300건입니다. 비율로 보면 오히려 나래시가 1.5배 위험합니다.',
      fixed: '사고 건수는 가람시가 3배, 인구 대비로는 나래시가 더 많아'
    },
    {
      key: 'B',
      title: "청소년 스마트폰 사용 시간 '폭증'… 3년 만에 그래프가 치솟았다",
      body: '청소년의 하루 평균 스마트폰 사용 시간이 해마다 가파르게 늘고 있다. 아래 그래프를 보면 2026년 막대는 2023년의 몇 배로 치솟았다.',
      chart: true,
      answer: 'c',
      explain: '세로축이 4.0에서 시작합니다. 실제로는 4.1시간에서 4.4시간으로 약 7%(하루 18분) 늘었는데, 막대는 4배로 보입니다.',
      fixed: '청소년 스마트폰 사용, 3년간 하루 18분 늘어'
    },
    {
      key: 'C',
      title: '아침밥 먹는 학생, 성적 상위권 1.5배… "아침밥이 성적 올린다"',
      body: '한 교육연구소가 고교생 3,000명을 조사한 결과, 매일 아침밥을 먹는 학생 중 성적 상위 30%에 드는 비율은 36%로, 먹지 않는 학생(24%)의 1.5배였다. 연구소 관계자는 "아침밥이 두뇌 활동을 도와 성적을 끌어올린다"고 말했다.',
      answer: 'f',
      explain: '아침밥과 성적이 함께 나타나는 것은 상관관계입니다. 규칙적인 생활습관, 수면, 가정의 돌봄 여건 같은 제3의 변수가 둘 다에 영향을 줄 수 있습니다.',
      fixed: '아침밥 먹는 학생, 상위권 비율 높아… 인과관계는 확인 안 돼'
    },
    {
      key: 'D',
      title: '청소년 82% "등교 시간 10시로 늦춰야"',
      body: '청소년 대다수가 등교 시간을 늦춰야 한다고 생각하는 것으로 나타났다. 한 온라인 게임 커뮤니티가 지난달 자정부터 새벽 2시까지 진행한 투표에 참여한 1,500명 가운데 82%가 "등교 시간을 10시로 늦춰야 한다"고 답했다.',
      answer: 'a',
      explain: '특정 커뮤니티, 심야 시간대, 자발적 참여 투표라 전체 청소년을 대표하지 못합니다. 표본 수(1,500명)가 많다고 편향이 사라지지는 않습니다.',
      fixed: '한 게임 커뮤니티 투표 참여자 82% "등교 늦춰야"'
    },
    {
      key: 'E',
      title: '컵라면 판매 2년 새 40% 급증… "고물가에 끼니 해결하는 서민 늘었다"',
      body: '올해 컵라면 판매량이 2024년보다 40% 늘어난 것으로 집계됐다. 업계는 외식비 부담이 커지면서 끼니를 컵라면으로 해결하는 사람이 급증했다고 분석했다.',
      table: { head: ['연도', '2021', '2022', '2023', '2024', '2025', '2026'], row: ['지수', '100', '102', '104', '75', '98', '105'] },
      note: '※ 2024년은 주요 공장 화재로 생산이 일시 중단된 해',
      answer: 'e',
      explain: '2024년은 공장 화재로 판매가 이례적으로 낮았던 해입니다. 2023년과 비교하면 약 1% 증가에 불과합니다.',
      fixed: '컵라면 판매, 공장 화재 이전 수준 회복'
    },
    {
      key: 'F',
      title: '"이 과자 즐겨 먹으면 희귀 피부질환 위험 2배"',
      body: '해외 연구진이 성인 100만 명을 10년간 추적한 결과, ○○ 성분이 든 과자를 주 3회 이상 먹는 사람은 희귀 피부질환 발병 위험이 그렇지 않은 사람의 2배였다. 발병률은 먹지 않는 사람 10만 명당 1명, 즐겨 먹는 사람 10만 명당 2명이었다.',
      answer: 'b',
      explain: '상대위험은 2배지만 절대위험은 10만 명당 1명 늘었습니다(0.001% → 0.002%).',
      fixed: '이 과자 즐겨 먹으면 희귀 피부질환 10만 명당 1명 더 발병'
    }
  ],
  // 기사 B 그래프 (세로축 4.0부터)
  chartB: [ { year: '2023', v: 4.1 }, { year: '2024', v: 4.2 }, { year: '2025', v: 4.3 }, { year: '2026', v: 4.4 } ],

  // 활동 2. 부풀린 제목 찾아내기
  q2: {
    source: '다온시 고교생 2,000명 조사',
    data: [
      ['하루 평균 수면 시간', '6시간 10분', '6시간 2분'],
      ['"수면이 부족하다" 응답', '58%', '61%']
    ],
    items: [
      { no: '①', text: '고교생 하루 수면 시간, 1년 새 8분 줄어', ok: true, explain: '8분 감소를 그대로 전달했습니다.' },
      { no: '②', text: "고교생 잠이 사라진다… 수면 시간 '급감'", ok: false, explain: "8분 줄어든 것을 '사라진다', '급감'으로 과장했습니다." },
      { no: '③', text: '고교생 10명 중 6명 "잠이 부족해"', ok: true, explain: '61%는 10명 중 약 6명입니다.' },
      { no: '④', text: '수면 부족 고교생, 역대 최고치 기록', ok: false, explain: "2년치 자료뿐이라 '역대 최고'라고 할 근거가 없습니다." },
      { no: '⑤', text: "충격! 고교생 수면 부족 '대폭증'", ok: false, explain: "3%p 늘어난 것을 '충격', '대폭증'으로 과장했습니다." }
    ],
    fixExample: "⑤ → \"고교생 '수면 부족' 응답, 58%에서 61%로 3%p 늘어\""
  },

  // 활동 3. 어그로 뉴스 제작소 — 자료 카드
  cards: [
    { id: 1, name: '급식', data: '다온고 급식 만족도: 2025년 72% → 2026년 70%' },
    { id: 2, name: '미세먼지', data: "다온시 미세먼지 '나쁨' 일수: 2024년 46일 → 2025년 38일 → 2026년 41일" },
    { id: 3, name: '편의점', data: '다온시 편의점 삼각김밥 가격: 2024년 1,200원 → 2026년 1,300원' }
  ],
  awards: [
    { id: 'click', name: '클릭 장인상', desc: '제목만 보고도 누르고 싶어지는 기사' },
    { id: 'magic', name: '숫자 마술사상', desc: '숫자는 하나도 안 바꿨는데 가장 크게 부풀린 기사' },
    { id: 'sense', name: '센스 만점상', desc: '표현이 가장 재치 있고 웃긴 기사' }
  ],
  phases: [
    { id: 'quiz', name: '활동 1·2' },
    { id: 'write', name: '기사 쓰기' },
    { id: 'read', name: '돌려 읽기' },
    { id: 'vote', name: '투표' },
    { id: 'award', name: '시상식' }
  ],
  READ_COUNT: 3,
  CANDIDATES: 5
};

/* 공통 도우미 */
window.NEWSUTIL = {
  esc: function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  },
  today: function () {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },
  // n일 전 날짜 (최근 수업 목록용)
  daysAgo: function (n) {
    var d = new Date(Date.now() - n * 86400000);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },
  dayLabel: function (day) {
    if (!day) return '';
    if (day === NEWSUTIL.today()) return '오늘';
    var p = day.split('-');
    return (+p[1]) + '월 ' + (+p[2]) + '일';
  },
  // 문자열 → 고정된 숫자 (돌려 읽기 순서를 섞을 때 사용)
  hash: function (s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  },
  // 돌려 읽기: 정해진 순서(order)에서 내 다음 기사 n개 (내 기사는 빼고)
  readTargets: function (code, sid, order, n) {
    var len = order.length;
    if (!len) return [];
    var idx = order.indexOf(sid);
    var start = idx >= 0 ? idx + 1 : (NEWSUTIL.hash(code + sid) % len);
    var out = [];
    for (var k = 0; k < len && out.length < n; k++) {
      var t = order[(start + k) % len];
      if (t !== sid) out.push(t);
    }
    return out;
  },
  trickLabel: function (id) {
    var all = NEWS.tricks.concat(NEWS.clues);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i].label;
    return id;
  },
  // 기사 B: 세로축이 4.0에서 시작하는 막대그래프
  chartSvg: function () {
    var rows = NEWS.chartB, base = 4.0, span = 0.5, y0 = 40, bottom = 230, left = 60, band = 110, bw = 64;
    var yv = function (v) { return bottom - (v - base) / span * (bottom - y0); };
    var s = '<svg viewBox="0 0 520 270" role="img" aria-label="청소년 하루 평균 스마트폰 사용 시간" style="width:100%;height:auto;display:block">';
    s += '<text x="10" y="20" font-size="15" font-weight="700" fill="#1d2a33">청소년 하루 평균 스마트폰 사용 시간 (단위: 시간)</text>';
    for (var k = 0; k <= 5; k++) {
      var t = base + k * 0.1, y = yv(t);
      s += '<line x1="' + (left - 6) + '" x2="510" y1="' + y + '" y2="' + y + '" stroke="#e2ddd2"/>';
      s += '<text x="' + (left - 12) + '" y="' + (y + 4) + '" font-size="13" text-anchor="end" fill="#55636d">' + t.toFixed(1) + '</text>';
    }
    rows.forEach(function (r, i) {
      var x = left + 20 + i * band, y = yv(r.v);
      s += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + (bottom - y) + '" fill="#d9572b" fill-opacity="' + (0.45 + i * 0.18) + '"/>';
      s += '<text x="' + (x + bw / 2) + '" y="' + (y - 7) + '" font-size="14" text-anchor="middle" fill="#1d2a33">' + r.v.toFixed(1) + '</text>';
      s += '<text x="' + (x + bw / 2) + '" y="' + (bottom + 20) + '" font-size="13" text-anchor="middle" fill="#55636d">' + r.year + '년</text>';
    });
    s += '<line x1="' + (left - 6) + '" x2="510" y1="' + bottom + '" y2="' + bottom + '" stroke="#9aa3a8"/>';
    return s + '</svg>';
  }
};
