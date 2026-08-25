/* =========================================================
   ANTAR YATRA — APP

   Everything lives in localStorage on this device.  Nothing
   is sent anywhere, which is why the export in the menu
   matters: it is the only backup that exists.
   ========================================================= */

const STORE_KEY = "antar-yatra-store-v2";
const LEGACY_KEY = "antar-yatra-sankalpas-v1";

const seed = [
  {
    id: "seed-gita",
    title: "Gita Reading",
    why: "To understand Krishna's teachings better.",
    frequency: "daily",
    duration: 30,
    completed: 18,
    icon: "📖",
    createdAt: new Date().toISOString()
  },
  {
    id: "seed-prayer",
    title: "Daily Prayer",
    why: "To begin each day with devotion.",
    frequency: "daily",
    duration: 21,
    completed: 12,
    icon: "🪔",
    createdAt: new Date().toISOString()
  },
  {
    id: "seed-shloka",
    title: "Sanskrit Shloka",
    why: "To learn and remember one shloka each week.",
    frequency: "weekly",
    duration: 12,
    completed: 6,
    icon: "ॐ",
    createdAt: new Date().toISOString()
  }
];


function newId() {

  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();

  return "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
}


function loadStore() {

  // the shape this version expects
  let store = {
    version: 2,
    sankalpas: null,
    reflections: [],
    mantras: [],
    energy: 72,
    gains: {}
  };

  try {

    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "null");

    if (raw && raw.version === 2) {
      return Object.assign(store, raw);
    }

    /*
     * Carry over anything saved by the first version rather
     * than quietly dropping someone's sankalpas.
     */

    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || "null");

    if (legacy && Array.isArray(legacy)) {
      store.sankalpas = legacy;
    }

    const legacyEnergy = localStorage.getItem("antar-yatra-energy");

    if (legacyEnergy !== null) store.energy = Number(legacyEnergy);

  } catch (e) {
    /* corrupt storage — fall through to the seed */
  }

  if (!store.sankalpas) store.sankalpas = seed;

  return store;
}


let store = loadStore();

let sankalpas = store.sankalpas;

let energy = store.energy;


const todayKey = () => new Date().toISOString().slice(0, 10);

let todayGain = store.gains[todayKey()] || 0;


// =========================================
// HELPERS
// =========================================

const $ = (id) => document.getElementById(id);


function save() {

  store.version = 2;
  store.sankalpas = sankalpas;
  store.energy = energy;
  store.gains[todayKey()] = todayGain;

  // keep only the last 60 days of gain history
  const cutoff =
    new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);

  Object.keys(store.gains).forEach(k => {
    if (k < cutoff) delete store.gains[k];
  });

  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch (e) {
    toast("Could not save — device storage is full.");
  }
}


/*
 * Cadence decides what a "unit" of a sankalpa means, and how
 * the Journey screen groups it.
 */

const CADENCE = {
  daily:       { unit: "days",       label: "Daily",           order: 1 },
  weekly:      { unit: "weeks",      label: "Weekly",          order: 2 },
  fortnightly: { unit: "fortnights", label: "Fortnightly",     order: 3 },
  monthly:     { unit: "months",     label: "Monthly",         order: 4 },
  ekadashi:    { unit: "Ekadashis",  label: "Every Ekadashi",  order: 5 }
};


function cadenceOf(s) {
  return CADENCE[s.frequency] || CADENCE.daily;
}


function unitFor(s) {
  return cadenceOf(s).unit;
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


  /*
   * The hamburger lives inside the home screen, so on every
   * other screen a floating one takes its place — otherwise
   * the menu is only reachable by going home first.
   */
  const floating = $("globalMenuBtn");

  if (floating) floating.hidden = (screenId === "homeScreen");


  // let each screen fill itself in as it opens
  if (screenId === "journeyScreen") renderJourney();
  if (screenId === "reflectionsScreen") renderReflection();
  if (screenId === "mantrasScreen") renderMantras();
  if (screenId === "ekadashiScreen") renderEkadashiScreen();
  if (screenId === "festivalsScreen") renderFestivals();
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

let journeyFilter = "active";


function renderJourney() {

  const list = $("journeyList");
  if (!list) return;

  list.innerHTML = "";

  const shown = sankalpas.filter(s => {

    const done = s.completed >= s.duration;

    if (journeyFilter === "active") return !done;
    if (journeyFilter === "completed") return done;

    return true;
  });


  if (shown.length === 0) {

    list.innerHTML =
      '<div class="ty-empty-screen">' +
      (journeyFilter === "completed"
        ? "No Sankalpa completed yet.<br>The first one is the hardest."
        : "Nothing here yet.<br>Make a Sankalpa to begin.") +
      "</div>";

    return;
  }


  /*
   * Group by cadence, so a fortnightly Ekadashi vow does not
   * sit in the same block as a daily reading.
   */

  const groups = {};

  shown.forEach(s => {

    const key = s.frequency || "daily";

    (groups[key] = groups[key] || []).push(s);
  });


  Object.keys(groups)
    .sort((a, b) => cadenceOf({ frequency: a }).order -
                    cadenceOf({ frequency: b }).order)
    .forEach(key => {

      const heading = document.createElement("div");

      heading.className = "ty-group";
      heading.textContent = CADENCE[key] ? CADENCE[key].label : key;

      list.appendChild(heading);


      groups[key].forEach(s => {

        const done = s.completed >= s.duration;

        const card = document.createElement("button");

        card.className = "ty-item";

        card.innerHTML = `

          <div class="ty-ic">${s.icon}</div>

          <div class="ty-tx">
            <div class="t">${escapeHtml(s.title)}</div>
            <div class="w">${done
              ? "Completed"
              : escapeHtml(s.why || "Your practice")}</div>
          </div>

          <div class="ty-pg">
            <div class="bar"><i style="width:${progressFor(s)}%"></i></div>
            <div class="n">${s.completed} / ${s.duration} ${unitFor(s)}</div>
          </div>

          <div class="ty-cv">${done ? "✓" : "›"}</div>
        `;

        card.addEventListener("click", () => openDetail(s.id));

        list.appendChild(card);
      });

    });
}


document
  .querySelectorAll("#journeyFilters .ty-chip")
  .forEach(chip => {

    chip.addEventListener("click", () => {

      journeyFilter = chip.dataset.filter;

      document
        .querySelectorAll("#journeyFilters .ty-chip")
        .forEach(c => c.classList.toggle("on", c === chip));

      renderJourney();
    });

  });


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

        ${unitFor(s)}

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
        ${s.completed >= s.duration ? "disabled" : ""}
      >
        ${s.completed >= s.duration ? "COMPLETED" : "MARK AS DONE ✓"}
      </button>

      <button class="ty-chip" id="amendSankalpa"
              style="margin-top:14px">
        Amend this Sankalpa
      </button>

    </div>

  `;


  $("completePractice")
    .addEventListener(
      "click",
      () => completePractice(s.id)
    );


  $("amendSankalpa")
    .addEventListener(
      "click",
      () => editSankalpa(s.id)
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

/* ---------------------------------------------------------
   Creating and amending are the same form.  editingId tells
   it which one it is doing.
   --------------------------------------------------------- */

let editingId = null;


function openCreate() {

  editingId = null;

  $("sankalpaForm").reset();

  $("createHeading").textContent = "New Sankalpa";
  $("createSubheading").textContent = "Make a meaningful resolve.";
  $("saveSankalpaBtn").textContent = "MAKE THIS SANKALPA";
  $("deleteSankalpaBtn").hidden = true;

  showScreen("createScreen");
}


function editSankalpa(id) {

  const s = sankalpas.find(item => item.id === id);
  if (!s) return;

  editingId = id;

  $("titleInput").value = s.title || "";
  $("whyInput").value = s.why || "";
  $("frequencyInput").value = s.frequency || "daily";
  $("durationInput").value = String(s.duration);

  $("createHeading").textContent = "Amend Sankalpa";
  $("createSubheading").textContent =
    "A resolve may be adjusted. It need not be abandoned.";
  $("saveSankalpaBtn").textContent = "SAVE CHANGES";
  $("deleteSankalpaBtn").hidden = false;

  showScreen("createScreen");
}


$("sankalpaForm").addEventListener("submit", event => {

  event.preventDefault();

  const title = $("titleInput").value.trim();
  const why = $("whyInput").value.trim();
  const frequency = $("frequencyInput").value;
  const duration = Number($("durationInput").value);

  if (!title) return;


  if (editingId) {

    const s = sankalpas.find(item => item.id === editingId);

    if (s) {

      s.title = title;
      s.why = why;
      s.frequency = frequency;
      s.duration = duration;

      /*
       * If the vow is shortened below what is already done,
       * the days kept still stand — clamp rather than lose them.
       */
      if (s.completed > s.duration) s.completed = s.duration;
    }

    toast("Sankalpa amended");

  } else {

    sankalpas.unshift({
      id: newId(),
      title,
      why,
      frequency,
      duration,
      completed: 0,
      icon: frequency === "ekadashi" ? "🌙" : "🪔",
      createdAt: new Date().toISOString()
    });

    toast("Sankalpa made");
  }

  editingId = null;

  save();
  renderHome();
  renderJourney();

  $("sankalpaForm").reset();

  showScreen("homeScreen");
});


/* Deleting is deliberately two taps. */

let pendingDelete = false;

$("deleteSankalpaBtn").addEventListener("click", () => {

  if (!editingId) return;

  const btn = $("deleteSankalpaBtn");

  if (!pendingDelete) {

    pendingDelete = true;
    btn.textContent = "Tap again to release it";

    setTimeout(() => {
      pendingDelete = false;
      btn.textContent = "Release this Sankalpa";
    }, 4000);

    return;
  }

  sankalpas = sankalpas.filter(item => item.id !== editingId);

  editingId = null;
  pendingDelete = false;
  btn.textContent = "Release this Sankalpa";

  save();
  renderHome();
  renderJourney();

  toast("Sankalpa released");

  showScreen("journeyScreen");
});


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


$("createBtn").addEventListener("click", openCreate);


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
// TOAST
// =========================================

let toastTimer = null;

function toast(message) {

  let el = document.querySelector(".ty-toast");

  if (!el) {
    el = document.createElement("div");
    el.className = "ty-toast";
    document.body.appendChild(el);
  }

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}


// =========================================
// MENU DRAWER
// =========================================

const drawer = $("drawer");


function openDrawer() {

  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");

  refreshDrawerPanchang();
}


function closeDrawer() {

  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}


$("menuBtn").addEventListener("click", openDrawer);

$("globalMenuBtn").addEventListener("click", openDrawer);

document
  .querySelectorAll("[data-close-drawer]")
  .forEach(el => el.addEventListener("click", closeDrawer));

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeDrawer();
});

document
  .querySelectorAll(".ty-drawer-item[data-go]")
  .forEach(item => {

    item.addEventListener("click", () => {

      const target = item.dataset.go;

      closeDrawer();

      if (target === "createScreen") openCreate();
      else showScreen(target);
    });

  });


function refreshDrawerPanchang() {

  const el = $("drawerPanchang");
  if (!el || !window.Panchang) return;

  const t = window.Panchang.today();
  if (!t) return;

  el.innerHTML =
    escapeHtml(t.tithi) + " · " + escapeHtml(t.paksha) + "<br>" +
    escapeHtml(t.month) + " · " + escapeHtml(t.nakshatra);
}


// =========================================
// DATES
// =========================================

const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun",
                     "Jul","Aug","Sep","Oct","Nov","Dec"];

const MONTH_LONG = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];


function dayKey(d) {

  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}


function prettyTime(d) {

  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}


function prettyDate(d) {

  return d.getDate() + " " + MONTH_LONG[d.getMonth()] + " " + d.getFullYear();
}


// =========================================
// REFLECTIONS
//
// One entry per day.  The timestamp is set when you first
// write something that day; editing later keeps it, because
// the moment that matters is when the thought came.
// =========================================

function reflectionFor(key) {
  return store.reflections.find(r => r.date === key);
}


function renderReflection() {

  const key = dayKey(new Date());
  const entry = reflectionFor(key);

  $("refLearned").value = entry ? (entry.learned || "") : "";
  $("refDifficult").value = entry ? (entry.difficult || "") : "";
  $("refContinue").value = entry ? (entry.willContinue || "") : "";

  $("reflectionStamp").textContent = entry
    ? "First written " + prettyTime(new Date(entry.createdAt)) +
      " · " + prettyDate(new Date(entry.createdAt))
    : prettyDate(new Date()) + " · not yet written";


  const list = $("reflectionList");

  const past = store.reflections
    .filter(r => r.date !== key)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (past.length === 0) {

    list.innerHTML =
      '<div class="ty-empty-screen">' +
      "Reflections you write will gather here." +
      "</div>";

    return;
  }

  list.innerHTML = past.map(r => {

    const bits = [r.learned, r.difficult, r.willContinue]
      .filter(Boolean)
      .map(escapeHtml)
      .join(" · ");

    return '<button class="ty-entry" data-ref="' + r.date + '">' +
      '<div class="when">' + prettyDate(new Date(r.createdAt)) +
      " · " + prettyTime(new Date(r.createdAt)) + "</div>" +
      '<div class="body">' + (bits || "—") + "</div>" +
      "</button>";

  }).join("");
}


$("saveReflection").addEventListener("click", () => {

  const key = dayKey(new Date());

  const learned = $("refLearned").value.trim();
  const difficult = $("refDifficult").value.trim();
  const willContinue = $("refContinue").value.trim();

  if (!learned && !difficult && !willContinue) {
    toast("Write something first");
    return;
  }

  let entry = reflectionFor(key);

  if (!entry) {

    // the stamp is set once, on the first writing of the day
    entry = { date: key, createdAt: new Date().toISOString() };

    store.reflections.push(entry);
  }

  entry.learned = learned;
  entry.difficult = difficult;
  entry.willContinue = willContinue;
  entry.updatedAt = new Date().toISOString();

  save();

  renderReflection();

  toast("Reflection saved");
});


// =========================================
// MANTRAS
// =========================================

let editingMantra = null;


function renderMantras() {

  const list = $("mantraList");

  if (store.mantras.length === 0) {

    list.innerHTML =
      '<div class="ty-empty-screen">' +
      "No mantras yet.<br>Add the first one you have learned." +
      "</div>";

    return;
  }

  list.innerHTML = store.mantras.map(m =>
    '<button class="ty-entry" data-mantra="' + m.id + '">' +
    '<div class="when">' + escapeHtml(m.title) + "</div>" +
    '<div class="mantra">' + escapeHtml(m.text).replace(/\n/g, "<br>") + "</div>" +
    (m.source ? '<div class="body">' + escapeHtml(m.source) + "</div>" : "") +
    "</button>"
  ).join("");

  list
    .querySelectorAll("[data-mantra]")
    .forEach(btn => {
      btn.addEventListener("click", () => openMantra(btn.dataset.mantra));
    });
}


function openMantra(id) {

  const m = store.mantras.find(x => x.id === id);
  if (!m) return;

  editingMantra = id;

  $("mantraEditTitle").textContent = "Edit Mantra";
  $("mantraTitle").value = m.title || "";
  $("mantraText").value = m.text || "";
  $("mantraMeaning").value = m.meaning || "";
  $("mantraSource").value = m.source || "";
  $("deleteMantra").hidden = false;

  showScreen("mantraEditScreen");
}


$("addMantraBtn").addEventListener("click", () => {

  editingMantra = null;

  $("mantraEditTitle").textContent = "Add a Mantra";
  $("mantraTitle").value = "";
  $("mantraText").value = "";
  $("mantraMeaning").value = "";
  $("mantraSource").value = "";
  $("deleteMantra").hidden = true;

  showScreen("mantraEditScreen");
});


$("saveMantra").addEventListener("click", () => {

  const title = $("mantraTitle").value.trim();
  const text = $("mantraText").value.trim();

  if (!title || !text) {
    toast("A title and the mantra are needed");
    return;
  }

  const fields = {
    title,
    text,
    meaning: $("mantraMeaning").value.trim(),
    source: $("mantraSource").value.trim()
  };

  if (editingMantra) {

    const m = store.mantras.find(x => x.id === editingMantra);

    if (m) Object.assign(m, fields, { updatedAt: new Date().toISOString() });

    toast("Mantra saved");

  } else {

    store.mantras.push(
      Object.assign({ id: newId(), createdAt: new Date().toISOString() }, fields)
    );

    toast("Mantra added");
  }

  editingMantra = null;

  save();
  renderMantras();

  showScreen("mantrasScreen");
});


let pendingMantraDelete = false;

$("deleteMantra").addEventListener("click", () => {

  if (!editingMantra) return;

  const btn = $("deleteMantra");

  if (!pendingMantraDelete) {

    pendingMantraDelete = true;
    btn.textContent = "Tap again to delete";

    setTimeout(() => {
      pendingMantraDelete = false;
      btn.textContent = "Delete this mantra";
    }, 4000);

    return;
  }

  store.mantras = store.mantras.filter(x => x.id !== editingMantra);

  editingMantra = null;
  pendingMantraDelete = false;
  btn.textContent = "Delete this mantra";

  save();
  renderMantras();

  toast("Mantra deleted");

  showScreen("mantrasScreen");
});


// =========================================
// PANCHANG SCREENS
// =========================================

let panchangReady = !!window.Panchang;

window.addEventListener("panchang-ready", () => {
  panchangReady = true;
  renderEkadashiCard();
  refreshDrawerPanchang();
  updateLocationLabel();
});


/* ---- the card on the home screen ---- */

function renderEkadashiCard() {

  const card = $("ekadashiCard");

  if (!card || !window.Panchang) return;

  const e = window.Panchang.nextEkadashi();

  if (!e) { card.hidden = true; return; }

  const when = e.isToday
    ? "Today"
    : e.daysAway === 1
      ? "Tomorrow"
      : "In " + e.daysAway + " days · " +
        e.date.getDate() + " " + MONTH_SHORT[e.date.getMonth()];

  card.classList.toggle("is-today", e.isToday);

  card.innerHTML =
    '<div class="moon">🌙</div>' +
    '<div class="body">' +
      '<div class="lb">NEXT EKADASHI</div>' +
      '<div class="nm">' + escapeHtml(e.name) + " Ekadashi</div>" +
      '<div class="when">' + when +
        (e.marginal ? " · close to sunrise" : "") + "</div>" +
    "</div>" +
    '<div class="cv">›</div>';

  card.hidden = false;
}


$("ekadashiCard").addEventListener("click", () => {
  ekMonth = new Date();
  showScreen("ekadashiScreen");
});


/* ---- the Ekadashi screen ---- */

let ekMonth = new Date();


function renderEkadashiScreen() {

  if (!window.Panchang) return;

  const P = window.Panchang;
  const place = P.getPlace();

  $("ekadashiPlace").textContent =
    "Sunrise reckoned for " + place.label;

  $("ekMonth").textContent =
    MONTH_LONG[ekMonth.getMonth()] + " " + ekMonth.getFullYear();

  const list = P.ekadashiInMonth(ekMonth.getFullYear(), ekMonth.getMonth());

  const todayStr = dayKey(new Date());

  $("ekadashiList").innerHTML = list.length === 0
    ? '<div class="ty-empty-screen">No Ekadashi falls in this month.</div>'
    : list.map(e => {

        const ds = dayKey(e.date);

        const cls = ds === todayStr ? "today" : (ds < todayStr ? "past" : "");

        return '<div class="ty-row ' + cls + '">' +
          '<div class="ty-date"><div class="d">' + e.date.getDate() +
            '</div><div class="mo">' + MONTH_SHORT[e.date.getMonth()] + "</div></div>" +
          '<div class="main">' +
            '<div class="t">' + escapeHtml(e.name) + " Ekadashi</div>" +
            '<div class="sub">' + escapeHtml(e.paksha) + " paksha · " +
              escapeHtml(e.month) + "<br>" +
              "Tithi ends " + prettyTime(e.tithiEnd) +
              " · sunrise " + prettyTime(e.sunrise) +
              (e.note ? "<br>" + escapeHtml(e.note) : "") +
            "</div>" +
            (e.marginal
              ? '<span class="ty-flag">Clears sunrise by only ' +
                e.minutesAfterSunrise + " min — confirm locally</span>"
              : "") +
          "</div>" +
        "</div>";

      }).join("");
}


$("ekPrev").addEventListener("click", () => {
  ekMonth = new Date(ekMonth.getFullYear(), ekMonth.getMonth() - 1, 1);
  renderEkadashiScreen();
});

$("ekNext").addEventListener("click", () => {
  ekMonth = new Date(ekMonth.getFullYear(), ekMonth.getMonth() + 1, 1);
  renderEkadashiScreen();
});


/* ---- the Festivals screen ---- */

let festYear = new Date().getFullYear();


function renderFestivals() {

  if (!window.Panchang) return;

  $("festYear").textContent = String(festYear);

  $("festYearLabel").textContent =
    "Computed for " + window.Panchang.getPlace().label;

  const list = window.Panchang.festivalsInYear(festYear);

  const todayStr = dayKey(new Date());

  $("festivalList").innerHTML = list.map(f => {

    const ds = dayKey(f.date);

    const cls = ds === todayStr ? "today" : (ds < todayStr ? "past" : "");

    return '<div class="ty-row ' + cls + '">' +
      '<div class="ty-date"><div class="d">' + f.date.getDate() +
        '</div><div class="mo">' + MONTH_SHORT[f.date.getMonth()] + "</div></div>" +
      '<div class="main">' +
        '<div class="t">' + escapeHtml(f.name) + "</div>" +
        '<div class="sub">' + escapeHtml(f.month) + " · " +
          escapeHtml(f.paksha) + " paksha" +
          (f.note ? "<br>" + escapeHtml(f.note) : "") +
        "</div>" +
      "</div>" +
    "</div>";

  }).join("");


  /*
   * Open on what is coming, not on January. Someone checking
   * in August should not have to scroll past eight months
   * that have already gone.
   */

  if (festYear === new Date().getFullYear()) {

    const next = $("festivalList").querySelector(".ty-row:not(.past)");

    if (next) {
      next.scrollIntoView({ block: "center", behavior: "auto" });
    }
  }
}


$("festPrev").addEventListener("click", () => {
  festYear -= 1;
  renderFestivals();
});

$("festNext").addEventListener("click", () => {
  festYear += 1;
  renderFestivals();
});


/* ---- location ---- */

function updateLocationLabel() {

  const el = $("locLabel");

  if (!el || !window.Panchang) return;

  el.textContent = "Location · " + window.Panchang.getPlace().label;
}


$("locBtn").addEventListener("click", () => {

  if (!window.Panchang) return;

  toast("Asking your browser for your location…");

  window.Panchang.askForLocation().then(place => {

    updateLocationLabel();
    renderEkadashiCard();
    refreshDrawerPanchang();

    toast(place.label === "Your location"
      ? "Panchang now uses your location"
      : "Kept " + place.label);
  });
});


// =========================================
// EXPORT / IMPORT
//
// Everything lives on this device only, so this is the whole
// backup story.  The file is plain JSON — readable, and
// restorable on any device.
// =========================================

$("exportBtn").addEventListener("click", () => {

  const payload = {
    app: "antar-yatra",
    version: 2,
    exportedAt: new Date().toISOString(),
    sankalpas,
    reflections: store.reflections,
    mantras: store.mantras,
    energy,
    gains: store.gains
  };

  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "antar-yatra-" + dayKey(new Date()) + ".json";

  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);

  closeDrawer();

  toast("Exported");
});


$("importBtn").addEventListener("click", () => $("importFile").click());


$("importFile").addEventListener("change", event => {

  const file = event.target.files && event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    let data;

    try {
      data = JSON.parse(reader.result);
    } catch (e) {
      toast("That file is not valid JSON");
      return;
    }

    if (!data || data.app !== "antar-yatra" || !Array.isArray(data.sankalpas)) {
      toast("That is not an Antar Yatra export");
      return;
    }

    /*
     * Merge rather than replace.  Importing on a device that
     * already has practice on it should never wipe it.
     */

    const seen = new Set(sankalpas.map(s => s.id));

    data.sankalpas.forEach(s => {
      if (!seen.has(s.id)) sankalpas.push(s);
    });

    const refSeen = new Set(store.reflections.map(r => r.date));

    (data.reflections || []).forEach(r => {
      if (!refSeen.has(r.date)) store.reflections.push(r);
    });

    const manSeen = new Set(store.mantras.map(m => m.id));

    (data.mantras || []).forEach(m => {
      if (!manSeen.has(m.id)) store.mantras.push(m);
    });

    if (typeof data.energy === "number") energy = data.energy;

    save();

    renderHome();
    renderJourney();
    renderMantras();
    renderReflection();

    closeDrawer();

    toast("Imported — nothing was overwritten");
  };

  reader.readAsText(file);

  event.target.value = "";
});


// =========================================
// INITIALIZE
// =========================================

paintEmbers();

paintToran();

renderHome();

renderJourney();

renderMantras();

renderReflection();

renderEkadashiCard();

updateLocationLabel();


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
        .register("sw.js")
        .then(reg => reg.update())
        .catch(() => {
          /* offline, or served from file:// — nothing to do */
        });

    }
  );


  /*
   * When a NEWLY DEPLOYED service worker takes over, reload
   * once so the temple you are looking at is the current one.
   * Without this a cached page can outlive several deploys.
   *
   * On a first ever visit there is no controller yet, and the
   * worker claiming the page is not an update — reloading then
   * would interrupt the darshan, so we sit that one out.
   */

  const hadController = !!navigator.serviceWorker.controller;

  let reloading = false;

  navigator.serviceWorker.addEventListener(
    "controllerchange",
    () => {

      if (!hadController || reloading) return;

      reloading = true;

      window.location.reload();
    }
  );

}