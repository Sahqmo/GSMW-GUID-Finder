const DATA = [
  [1094, "스테이지 엔티티", "고유번호"],
  [1073, "프리셋 지점 생성", ""],
  [1073, "인터페이스 컨트롤", ""],
  [1073, "유닛 태그", ""],
  [1073, "채팅", ""],
  [1077, "동적 유닛 프리팹", ""],
  [1077, "유닛 상태", ""],
  [1077, "투사체", ""],
  [1077, "구조체", ""],
  [1082, "피조물 프리팹", "프리팹 라이브러리"],
  [1090, "커스텀 직업", "전투 프리셋"],
  [1098, "스킬", "전투 프리셋"],
  [1103, "스킬 리소스", ""],
  [1107, "아이템", "전투 프리셋"],
  [1115, "화폐 생성", "화폐와 배낭"],
  [1124, "타입", "장비 데이터 관리"],
  [1128, "태그", "장비 데이터 관리"],
  [1132, "옵션", "장비 데이터 관리"],
  [1136, "상점 템플릿", ""],
  [1153, "장비 슬롯", "화폐와 배낭"],
  [1157, "보호막", ""],
  [1161, "스캔 태그", ""],
  [1182, "광원", ""],
  [1000, "동적 유닛", "고유번호군"],
  [1000, "드랍품", "고유번호군"],
  [1010, "유닛 상태", "고유번호군"],
  [2000, "정적 유닛", "고유번호군"],
  [3000, "피조물", "고유번호군"],
];

const $q = document.getElementById("query");
const $results = document.getElementById("results");
const $count = document.getElementById("count");

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
function digitsOnly(s) {
  return (s || "").replace(/[^0-9]+/g, "");
}
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const ENTRIES = DATA.map((r) => [
  String(r[0]),
  String(r[1]),
  r[2] ? String(r[2]) : "",
]).sort((a, b) => Number(a[0]) - Number(b[0]));

function searchAndRender(prefix) {
  const q = digitsOnly(prefix);
  const matched = q
    ? ENTRIES.filter(([k]) => k.startsWith(q))
    : ENTRIES.slice();
  $count.textContent = matched.length;
  render(matched, q);
}

function render(items, q) {
  if (!items.length) {
    $results.innerHTML =
      '<div class="empty">조건에 맞는 결과가 없습니다.</div>';
    return;
  }
  const html = items
    .map(([k, v, c]) => {
      const keyHtml =
        q && k.startsWith(q)
          ? '<span class="hit">' + q + "</span>" + k.slice(q.length)
          : k;
      const specialClass = k === "1094" ? " special" : "";
      return `<article class="item${specialClass}"><div class="kv"><div class="k">${keyHtml}</div><div class="v">${escapeHtml(
        v
      )}</div></div>${
        c ? `<div class="cat">${escapeHtml(c)}</div>` : ""
      }</article>`;
    })
    .join("");
  $results.innerHTML = html;
}

$q.addEventListener(
  "input",
  debounce((e) => searchAndRender(e.target.value), 120)
);
searchAndRender("");
