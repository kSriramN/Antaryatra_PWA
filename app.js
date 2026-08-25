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

let sankalpas =
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || seed;

let energy =
  Number(localStorage.getItem("antar-yatra-energy") || 72);


// How much Inner Energy was gained today (shown next to the number).
const TODAY_KEY = "antar-yatra-gain-" + new Date().toDateString();

let todayGain =
  Number(localStorage.getItem(TODAY_KEY) || 0);


// =========================================
// HELPERS
// =========================================

const $ = (id) => document.getElementById(id);


function save() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(sankalpas)
  );

  localStorage.setItem(
    "antar-yatra-energy",
    String(energy)
  );

  localStorage.setItem(
    TODAY_KEY,
    String(todayGain)
  );
}


function escapeHtml(value) {

  return String(value).replace(
    /[&<>"']/g,
    c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c])
  );
}


function progressFor(s) {

  return Math.min(
    100,
    Math.round(
      (s.completed / s.duration) * 100
    )
  );
}


// =========================================
// SCREEN MANAGEMENT
// =========================================

function showScreen(screenId) {

  // Hide every application screen
  document
    .querySelectorAll(".screen")
    .forEach(screen => {

      screen.classList.remove("active");

    });


  // Show requested screen
  const target =
    document.getElementById(screenId);

  if (target) {

    target.classList.add("active");

  }


  // Update bottom navigation
  document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.screen === screenId
      );

    });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// =========================================
// HOME
// =========================================

function renderHome() {

  // ---- Inner Energy ----
  $("energyValue").textContent = energy;

  const pct = Math.max(0, Math.min(100, energy));

  const bar = $("tyEnergyBar");
  if (bar) bar.style.width = pct + "%";

  const arc = $("tyEnergyArc");
  if (arc) arc.setAttribute("stroke-dasharray", pct + " 100");

  const delta = $("tyEnergyDelta");
  if (delta) {
    delta.textContent =
      todayGain > 0 ? "\u25B2 +" + todayGain + " today" : "";
  }


  // ---- Greeting follows the hour ----
  renderGreeting();


  // ---- Today's Sankalpas ----
  const list = $("todayList");
  list.innerHTML = "";

  const active =
    sankalpas.filter(s => s.completed < s.duration);

  if (active.length === 0) {

    list.innerHTML =
      '<div class="ty-empty">' +
      'No Sankalpa yet. Make your first resolve below.' +
      '</div>';

    return;
  }


  active
    .slice(0, 4)
    .forEach(s => {

      const unit =
        s.frequency === "weekly" ? "weeks" : "days";

      const card =
        document.createElement("button");

      card.className = "ty-item";

      card.innerHTML = `

        <div class="ty-ic">
          ${s.icon}
        </div>

        <div class="ty-tx">
          <div class="t">${escapeHtml(s.title)}</div>
          <div class="w">${escapeHtml(s.why || "Your daily practice")}</div>
        </div>

        <div class="ty-pg">
          <div class="bar">
            <i style="width:${progressFor(s)}%"></i>
          </div>
          <div class="n">${s.completed} / ${s.duration} ${unit}</div>
        </div>

        <div class="ty-cv">\u203A</div>
      `;

      card.addEventListener(
        "click",
        () => openDetail(s.id)
      );

      list.appendChild(card);

    });
}


// =========================================
// GREETING BY TIME OF DAY
// =========================================

function renderGreeting() {

  const el = $("tyGreeting");
  const sub = $("tyGreetingSub");

  if (!el) return;

  const h = new Date().getHours();

  let dv = "\u0936\u0941\u092D \u092A\u094D\u0930\u092D\u093E\u0924";
  let en = "May your day be blessed";

  if (h >= 12 && h < 17) {
    dv = "\u0936\u0941\u092D \u0926\u093F\u0928";
    en = "May your day be blessed";
  } else if (h >= 17 && h < 21) {
    dv = "\u0936\u0941\u092D \u0938\u0902\u0927\u094D\u092F\u093E";
    en = "May your evening be peaceful";
  } else if (h >= 21 || h < 5) {
    dv = "\u0936\u0941\u092D \u0930\u093E\u0924\u094D\u0930\u093F";
    en = "Rest well, the journey continues";
  }

  el.textContent = dv;
  if (sub) sub.textContent = en;
}


// =========================================
// JOURNEY
// =========================================

function renderJourney() {

  const list =
    $("journeyList");

  list.innerHTML = "";


  sankalpas.forEach(s => {

    const card =
      document.createElement("div");

    card.className =
      "sankalpa-card";


    card.innerHTML = `

      <div class="card-row">

        <div class="card-icon">
          ${s.icon}
        </div>

        <div class="card-title">

          <strong>
            ${escapeHtml(s.title)}
          </strong>

          <span>

            ${
              s.completed >= s.duration
                ? "Completed"
                : `${s.completed} / ${s.duration}`
            }

          </span>

        </div>

        <div class="check">

          ${
            s.completed >= s.duration
              ? "✓"
              : "•"
          }

        </div>

      </div>


      <div class="progress">

        <div
          style="width:${progressFor(s)}%"
        ></div>

      </div>

    `;


    list.appendChild(card);

  });
}


// =========================================
// SANKALPA DETAIL
// =========================================

function openDetail(id) {

  const s =
    sankalpas.find(
      item => item.id === id
    );


  if (!s) return;


  const days =
    Array.from(
      { length: s.duration },
      (_, i) => `

        <span
          class="diya ${
            i < s.completed
              ? "lit"
              : ""
          }"
        >
          ${
            i < s.completed
              ? "🪔"
              : "○"
          }
        </span>

      `
    ).join("");


  $("detailContent").innerHTML = `

    <div class="detail-hero">

      <div class="detail-icon">
        ${s.icon}
      </div>

      <h1>
        ${escapeHtml(s.title)}
      </h1>

      <p>
        ${escapeHtml(
          s.why ||
          "A meaningful commitment to your spiritual journey."
        )}
      </p>

      <p>

        <strong>
          ${s.completed} / ${s.duration}
        </strong>

        ${
          s.frequency === "weekly"
            ? "weeks"
            : "days"
        }

        · ${progressFor(s)}%

      </p>

    </div>


    <div class="diyas">

      ${days}

    </div>


    <div class="practice-box">

      <strong>
        Today's Practice
      </strong>

      <p>
        ${escapeHtml(s.title)}
      </p>


      <button
        class="primary-btn"
        id="completePractice"
      >

        ${
          s.completed >= s.duration
            ? "COMPLETED"
            : "MARK AS DONE ✓"
        }

      </button>

    </div>

  `;


  $("completePractice")
    .addEventListener(
      "click",
      () => completePractice(s.id)
    );


  showScreen("detailScreen");
}


// =========================================
// COMPLETE PRACTICE
// =========================================

function completePractice(id) {

  const s =
    sankalpas.find(
      item => item.id === id
    );


  if (
    !s ||
    s.completed >= s.duration
  ) {
    return;
  }


  s.completed += 1;


  const before = energy;

  energy =
    Math.min(
      100,
      energy + 3
    );

  todayGain += (energy - before);


  save();

  renderHome();

  renderJourney();


  if (
    s.completed >= s.duration
  ) {

    showCelebration(s);

  } else {

    openDetail(s.id);

  }
}


// =========================================
// CELEBRATION
// =========================================

function showCelebration(s) {

  $("celebrationTitle").textContent =
    `${s.title} — ${
      s.duration
    } ${
      s.frequency === "weekly"
        ? "weeks"
        : "days"
    } completed`;


  $("celebration")
    .classList
    .remove("hidden");
}


function closeCelebration() {

  $("celebration")
    .classList
    .add("hidden");

  showScreen("journeyScreen");
}


// =========================================
// CREATE SANKALPA
// =========================================

$("sankalpaForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const title =
        $("titleInput")
          .value
          .trim();


      const why =
        $("whyInput")
          .value
          .trim();


      const frequency =
        $("frequencyInput")
          .value;


      const duration =
        Number(
          $("durationInput")
            .value
        );


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


      showScreen(
        "homeScreen"
      );

    }
  );


// =========================================
// NAVIGATION
// =========================================

document
  .querySelectorAll(".nav-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showScreen(
          button.dataset.screen
        );

      }
    );

  });


document
  .querySelectorAll("[data-back]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showScreen(
          "homeScreen"
        );

      }
    );

  });


$("createBtn")
  .addEventListener(
    "click",
    () => {

      showScreen(
        "createScreen"
      );

    }
  );


$("viewAllBtn")
  .addEventListener(
    "click",
    () => {

      showScreen(
        "journeyScreen"
      );

    }
  );


$("closeCelebration")
  .addEventListener(
    "click",
    closeCelebration
  );


// =========================================
// TEMPLE GATE -> DARSHAN
//
// Leaving the gate does not cut to the home
// screen.  The home screen appears with the
// sanctum curtain (pardah) still closed, and
// the curtain then parts for darshan.
// =========================================

const DARSHAN_KEY = "antar-yatra-darshan-taken";

const enterTempleBtn = $("enterTempleBtn");
const templeEntrance = $("templeEntrance");
const shrine = $("tyShrine");


function openCurtain(delay) {

  if (!shrine) return;

  setTimeout(
    () => {

      shrine.classList.add("ty-shrine-open");

      try {
        sessionStorage.setItem(DARSHAN_KEY, "1");
      } catch (e) {
        /* private mode — the curtain simply opens again next time */
      }

    },
    delay
  );
}


if (enterTempleBtn) {

  enterTempleBtn.addEventListener(
    "click",
    () => {

      templeEntrance.classList.add("ty-exit");

      setTimeout(
        () => {

          templeEntrance.classList.add("ty-hidden");

          showScreen("homeScreen");

          /*
           * A breath of stillness first — long enough to
           * register the closed pardah — then darshan.
           */
          openCurtain(1100);

        },
        900
      );

    }
  );
}


// =========================================
// AMBIENT DETAIL
// Embers drifting through the hall, and the
// mango-leaf toran strung across the shrine.
// =========================================

function paintEmbers() {

  const host = $("tyEmbers");
  if (!host) return;

  let html = "";

  for (let i = 0; i < 46; i += 1) {

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const scale = 0.5 + Math.random() * 1.8;
    const dur = 14 + Math.random() * 22;
    const delay = -Math.random() * 30;

    html +=
      '<span class="ty-ember" style="' +
      'left:' + x.toFixed(2) + '%;' +
      'top:' + y.toFixed(2) + '%;' +
      'opacity:' + (0.12 + Math.random() * 0.6).toFixed(2) + ';' +
      '--s:' + scale.toFixed(2) + ';' +
      'animation-duration:' + dur.toFixed(1) + 's;' +
      'animation-delay:' + delay.toFixed(1) + 's;' +
      '"></span>';
  }

  host.innerHTML = html;
}


function paintToran() {

  const host = $("tyToran");
  if (!host) return;

  const N = 26;
  const marigold = ["#F0A72B", "#FFD257", "#E2622A"];

  let svg = "";

  for (let i = 0; i <= N; i += 1) {

    const u = i / N;
    const x = 10 + u * 332;
    const y = 10 + Math.sin(u * Math.PI) * 54;

    svg +=
      '<path d="M' + x.toFixed(1) + ' ' + y.toFixed(1) +
      ' q4.6 8 0 17 q-4.6-9 0-17z" fill="' +
      (i % 2 ? "#2F6B2A" : "#3D8A33") + '" opacity=".92"/>';

    if (i % 3 === 0) {
      svg +=
        '<circle cx="' + x.toFixed(1) + '" cy="' + (y - 2).toFixed(1) +
        '" r="3.4" fill="' + marigold[i % 3] + '"/>';
    }
  }

  host.innerHTML = svg;
}


// =========================================
// INITIALIZE
// =========================================

paintEmbers();

paintToran();

renderHome();

renderJourney();


// Start on Home internally,
// but keep entrance visible.
document
  .querySelectorAll(".screen")
  .forEach(screen => {

    screen.classList.remove(
      "active"
    );

  });


/*
 * If darshan was already taken in this session,
 * skip the gate and leave the curtain open.
 */

let darshanTaken = false;

try {
  darshanTaken =
    sessionStorage.getItem(DARSHAN_KEY) === "1";
} catch (e) {
  darshanTaken = false;
}


if (darshanTaken) {

  templeEntrance.classList.add("ty-hidden");

  shrine.classList.add("ty-shrine-still");

  showScreen("homeScreen");
}


if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    () => {

      navigator
        .serviceWorker
        .register("sw.js");

    }
  );

}