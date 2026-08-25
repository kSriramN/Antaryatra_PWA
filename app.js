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

  $("energyValue").textContent = energy;

  const list = $("todayList");

  list.innerHTML = "";


  sankalpas
    .slice(0, 5)
    .forEach(s => {

      const card =
        document.createElement("button");

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
              ${s.completed} / ${s.duration}
              ${s.frequency === "weekly"
                ? "weeks"
                : "days"}
            </span>

          </div>

          <div class="check">

            ${
              s.completed >= s.duration
                ? "✓"
                : "›"
            }

          </div>

        </div>


        <div class="progress">

          <div
            style="width:${progressFor(s)}%"
          ></div>

        </div>

      `;


      card.addEventListener(
        "click",
        () => openDetail(s.id)
      );


      list.appendChild(card);

    });
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


  energy =
    Math.min(
      100,
      energy + 3
    );


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
// TEMPLE ENTRANCE → LORD RAM DARSHAN
// =========================================

const enterTempleBtn =
  $("enterTempleBtn");

const templeEntrance =
  $("templeEntrance");

const ramReveal =
  $("ramReveal");


enterTempleBtn
  .addEventListener(
    "click",
    () => {

      // First fade out the Temple Entrance.
      templeEntrance
        .classList
        .add("exit");


      // After the entrance has faded,
      // reveal Lord Ram.
      setTimeout(
        () => {

          templeEntrance
            .classList
            .add("hidden");


          ramReveal
            .classList
            .remove("leaving");


          ramReveal
            .classList
            .add("active");


          /*
           * Keep Lord Ram visible for
           * approximately 2.8 seconds.
           *
           * Then reveal the existing
           * Home screen and begin the
           * gentle Ram fade-out.
           */

          setTimeout(
            () => {

              showScreen(
                "homeScreen"
              );


              ramReveal
                .classList
                .add("leaving");

            },
            2800
          );


          /*
           * Remove the Ram overlay completely
           * after the 1.2 second fade-out.
           */

          setTimeout(
            () => {

              ramReveal
                .classList
                .remove(
                  "active",
                  "leaving"
                );

            },
            4100
          );

        },
        1000
      );

    }
  );


// =========================================
// INITIALIZE
// =========================================

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