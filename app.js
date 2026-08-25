const STORAGE_KEY = "antar-yatra-sankalpas-v1";

const seed = [
  {
    id: crypto.randomUUID(),
    title: "Gita Reading",
    why: "To understand Krishna's teachings better.",
    frequency: "daily",
    duration: 30,
    completed: 18,
    icon: "📖"
  },
  {
    id: crypto.randomUUID(),
    title: "Daily Prayer",
    why: "To begin each day with devotion.",
    frequency: "daily",
    duration: 21,
    completed: 12,
    icon: "🪔"
  },
  {
    id: crypto.randomUUID(),
    title: "Sanskrit Shloka",
    why: "To learn and remember one shloka each week.",
    frequency: "weekly",
    duration: 12,
    completed: 6,
    icon: "ॐ"
  }
];

let sankalpas = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || seed;
let energy = Number(localStorage.getItem("antar-yatra-energy") || 72);

const $ = (id) => document.getElementById(id);

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sankalpas));
  localStorage.setItem("antar-yatra-energy", String(energy));
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.screen === id);
  });
  window.scrollTo({top: 0, behavior: "smooth"});
}

function progressFor(s) {
  return Math.min(100, Math.round((s.completed / s.duration) * 100));
}

function renderHome() {
  $("energyValue").textContent = energy;
  const list = $("todayList");
  list.innerHTML = "";
  sankalpas.slice(0, 5).forEach(s => {
    const card = document.createElement("button");
    card.className = "sankalpa-card";
    card.innerHTML = `
      <div class="card-row">
        <div class="card-icon">${s.icon}</div>
        <div class="card-title">
          <strong>${escapeHtml(s.title)}</strong>
          <span>${s.completed} / ${s.duration} ${s.frequency === "weekly" ? "weeks" : "days"}</span>
        </div>
        <div class="check">${s.completed >= s.duration ? "✓" : "›"}</div>
      </div>
      <div class="progress"><div style="width:${progressFor(s)}%"></div></div>
    `;
    card.addEventListener("click", () => openDetail(s.id));
    list.appendChild(card);
  });
}

function renderJourney() {
  const list = $("journeyList");
  list.innerHTML = "";
  sankalpas.forEach(s => {
    const card = document.createElement("div");
    card.className = "sankalpa-card";
    card.innerHTML = `
      <div class="card-row">
        <div class="card-icon">${s.icon}</div>
        <div class="card-title">
          <strong>${escapeHtml(s.title)}</strong>
          <span>${s.completed >= s.duration ? "Completed" : `${s.completed} / ${s.duration}`}</span>
        </div>
        <div class="check">${s.completed >= s.duration ? "✓" : "•"}</div>
      </div>
      <div class="progress"><div style="width:${progressFor(s)}%"></div></div>
    `;
    list.appendChild(card);
  });
}

function openDetail(id) {
  const s = sankalpas.find(x => x.id === id);
  if (!s) return;

  const days = Array.from({length: s.duration}, (_, i) =>
    `<span class="diya ${i < s.completed ? "lit" : ""}">${i < s.completed ? "🪔" : "○"}</span>`
  ).join("");

  $("detailContent").innerHTML = `
    <div class="detail-hero">
      <div class="detail-icon">${s.icon}</div>
      <h1>${escapeHtml(s.title)}</h1>
      <p>${escapeHtml(s.why || "A meaningful commitment to your spiritual journey.")}</p>
      <p><strong>${s.completed} / ${s.duration}</strong> ${s.frequency === "weekly" ? "weeks" : "days"} · ${progressFor(s)}%</p>
    </div>

    <div class="diyas">${days}</div>

    <div class="practice-box">
      <strong>Today's Practice</strong>
      <p>${escapeHtml(s.title)}</p>
      <button class="primary-btn" id="completePractice">
        ${s.completed >= s.duration ? "COMPLETED" : "MARK AS DONE ✓"}
      </button>
    </div>
  `;

  $("completePractice").addEventListener("click", () => completePractice(s.id));
  showScreen("detailScreen");
}

function completePractice(id) {
  const s = sankalpas.find(x => x.id === id);
  if (!s || s.completed >= s.duration) return;

  s.completed += 1;
  energy = Math.min(100, energy + 3);
  save();
  renderHome();
  renderJourney();

  if (s.completed >= s.duration) {
    showCelebration(s);
  } else {
    openDetail(s.id);
  }
}

function showCelebration(s) {
  $("celebrationTitle").textContent = `${s.title} — ${s.duration} ${s.frequency === "weekly" ? "weeks" : "days"} completed`;
  $("celebration").classList.remove("hidden");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

$("createBtn").addEventListener("click", () => showScreen("createScreen"));
$("viewAllBtn").addEventListener("click", () => showScreen("journeyScreen"));

document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => showScreen("homeScreen"));
});

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.screen));
});

$("sankalpaForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = $("titleInput").value.trim();
  const why = $("whyInput").value.trim();
  const frequency = $("frequencyInput").value;
  const duration = Number($("durationInput").value);

  sankalpas.unshift({
    id: crypto.randomUUID(),
    title,
    why,
    frequency,
    duration,
    completed: 0,
    icon: "🪔"
  });

  save();
  renderHome();
  renderJourney();
  $("sankalpaForm").reset();
  showScreen("homeScreen");
});

$("closeCelebration").addEventListener("click", () => {
  $("celebration").classList.add("hidden");
  showScreen("journeyScreen");
});

renderHome();
renderJourney();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}
