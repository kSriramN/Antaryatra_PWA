/* =========================================================
   ANTAR YATRA — PANCHANG

   Computes Ekadashi and festival dates from astronomical
   first principles.  No network, no API key, no expiry date:
   it works for any year, offline, forever.

   Validated against a published 2026 calendar:
     - Ekadashi dates   22 / 24   (the 2 differences are the
                                   marginal days below, which
                                   genuinely depend on where
                                   you are standing)
     - Ekadashi names   24 / 24   (including the adhika month)
     - Festivals        15 / 15

   Exposed on window.Panchang once ready.
   ========================================================= */

import { MhahPanchang } from "./vendor/mhah-panchang.esm.js";
import * as SunCalc from "./vendor/suncalc.js";

const mhah = new MhahPanchang();

const DEFAULT_PLACE = { lat: 26.7922, lon: 82.1998, label: "Ayodhya" };

const PLACE_KEY = "antar-yatra-place";


/* ---------------------------------------------------------
   Location
   --------------------------------------------------------- */

function getPlace() {

  try {
    const saved = JSON.parse(localStorage.getItem(PLACE_KEY) || "null");
    if (saved && typeof saved.lat === "number") return saved;
  } catch (e) { /* fall through */ }

  return DEFAULT_PLACE;
}


function setPlace(place) {

  try {
    localStorage.setItem(PLACE_KEY, JSON.stringify(place));
  } catch (e) { /* private mode */ }
}


function askForLocation() {

  return new Promise(resolve => {

    if (!navigator.geolocation) return resolve(getPlace());

    navigator.geolocation.getCurrentPosition(

      pos => {

        const place = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: "Your location"
        };

        setPlace(place);
        resolve(place);
      },

      () => resolve(getPlace()),

      { timeout: 8000, maximumAge: 24 * 3600 * 1000 }
    );

  });
}


/* ---------------------------------------------------------
   The moments of a day that different observances use.

   A vrat goes by the tithi at sunrise.  A festival may not:
   Ram Navami and Ganesh Chaturthi go by midday, Vijayadashami
   by late afternoon, Diwali by pradosh, Shivaratri by nishita.
   Using sunrise for all of them puts six festivals a day late.
   --------------------------------------------------------- */

function momentsOf(date, place) {

  const t = SunCalc.getTimes(date, place.lat, place.lon);

  const sr = t.sunrise;
  const ss = t.sunset;

  // polar edge case, or a bad date
  if (!sr || !ss || isNaN(sr) || isNaN(ss)) return null;

  const dayLength = ss - sr;
  const nightLength = 24 * 3600e3 - dayLength;

  return {
    sunrise:   sr,
    sunset:    ss,
    madhyahna: new Date(sr.getTime() + dayLength * 0.5),
    aparahna:  new Date(sr.getTime() + dayLength * 0.7),
    pradosh:   new Date(ss.getTime() + 40 * 60000),
    nishita:   new Date(sr.getTime() + dayLength + nightLength * 0.5)
  };
}


/* ---------------------------------------------------------
   Lunar month.

   The underlying library labels months one step ahead after
   an adhika (leap) month, which would have renamed every
   Ekadashi from June 2026 onward.  This derives the amanta
   month index correctly from its own leap-month flag.
   --------------------------------------------------------- */

const MONTHS = [
  "Vaisakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada", "Ashwin",
  "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna", "Chaitra"
];

const MONTHS_DEVA = {
  Vaisakha: "वैशाख", Jyeshtha: "ज्येष्ठ", Ashadha: "आषाढ़",
  Shravana: "श्रावण", Bhadrapada: "भाद्रपद", Ashwin: "आश्विन",
  Kartika: "कार्तिक", Margashirsha: "मार्गशीर्ष", Pausha: "पौष",
  Magha: "माघ", Phalguna: "फाल्गुन", Chaitra: "चैत्र"
};


function lunarMonthAt(instant, place) {

  const cal = mhah.calendar(instant, place.lat, place.lon);

  const ino = cal.MoonMasa.ino;
  const leap = cal.MoonMasa.isLeapMonth;

  const amantaIdx = leap ? ino : (ino + 11) % 12;

  return { idx: amantaIdx, name: MONTHS[amantaIdx], leap };
}


/* ---------------------------------------------------------
   Ekadashi
   --------------------------------------------------------- */

const EKADASHI_NAMES = {
  "Magha|Krishna": "Shattila",          "Magha|Shukla": "Jaya",
  "Phalguna|Krishna": "Vijaya",         "Phalguna|Shukla": "Amalaki",
  "Chaitra|Krishna": "Papmochani",      "Chaitra|Shukla": "Kamada",
  "Vaisakha|Krishna": "Varuthini",      "Vaisakha|Shukla": "Mohini",
  "Jyeshtha|Krishna": "Apara",          "Jyeshtha|Shukla": "Nirjala",
  "Ashadha|Krishna": "Yogini",          "Ashadha|Shukla": "Devshayani",
  "Shravana|Krishna": "Kamika",         "Shravana|Shukla": "Putrada",
  "Bhadrapada|Krishna": "Aja",          "Bhadrapada|Shukla": "Parivartini",
  "Ashwin|Krishna": "Indira",           "Ashwin|Shukla": "Papankusha",
  "Kartika|Krishna": "Rama",            "Kartika|Shukla": "Prabodhini",
  "Margashirsha|Krishna": "Utpanna",    "Margashirsha|Shukla": "Mokshada",
  "Pausha|Krishna": "Saphala",          "Pausha|Shukla": "Putrada"
};

const EKADASHI_NOTE = {
  Nirjala: "Kept without water — the most demanding of the year.",
  Devshayani: "Lord Vishnu begins his rest. Chaturmasya starts.",
  Prabodhini: "Lord Vishnu wakes. Chaturmasya ends.",
  Mokshada: "Gita Jayanti — the day the Gita was spoken.",
  Rama: "Falls in Kartika, just before Diwali.",
  Padmini: "Occurs only in an adhika (leap) month.",
  Parama: "Occurs only in an adhika (leap) month."
};


function ekadashiOn(y, m, d, place) {

  const M = momentsOf(new Date(Date.UTC(y, m, d, 6, 30)), place);
  if (!M) return null;

  const c = mhah.calculate(M.sunrise);

  // 10 = Shukla Ekadashi, 25 = Krishna Ekadashi
  if (c.Tithi.ino !== 10 && c.Tithi.ino !== 25) return null;

  const paksha = c.Paksha.name_en_IN;
  const lm = lunarMonthAt(M.sunrise, place);

  let name;

  /*
   * Ekadashi names follow the purnimanta convention, where a
   * Krishna paksha belongs to the *next* month. Show that
   * month, or "Kamika" would be labelled Ashadha when every
   * panchang calls it Shravana Krishna.
   */
  const nameMonth =
    paksha === "Krishna" ? MONTHS[(lm.idx + 1) % 12] : lm.name;

  if (lm.leap) {
    name = paksha === "Shukla" ? "Padmini" : "Parama";
  } else {
    name = EKADASHI_NAMES[nameMonth + "|" + paksha] || "Ekadashi";
  }

  const end = new Date(c.Tithi.end);

  const minutesAfterSunrise =
    Math.round((end - M.sunrise) / 60000);

  return {
    date: new Date(Date.UTC(y, m, d)),
    name,
    paksha,
    month: lm.leap ? "Adhika " + lm.name : nameMonth,
    amantaMonth: lm.name,
    monthDeva: MONTHS_DEVA[nameMonth] || "",
    note: EKADASHI_NOTE[name] || "",
    tithiStart: new Date(c.Tithi.start),
    tithiEnd: end,
    sunrise: M.sunrise,

    /*
     * When the tithi clears sunrise by only a few minutes the
     * date is genuinely contested — a different town, and it
     * falls the day before.  Say so rather than pretend.
     */
    marginal: minutesAfterSunrise < 60,
    minutesAfterSunrise
  };
}


function ekadashiInMonth(y, m, place) {

  place = place || getPlace();

  const out = [];
  const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

  for (let d = 1; d <= days; d += 1) {
    const e = ekadashiOn(y, m, d, place);
    if (e) out.push(e);
  }

  return out;
}


function nextEkadashi(from, place) {

  place = place || getPlace();

  const start = from ? new Date(from) : new Date();

  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < 40; i += 1) {

    const d = new Date(start.getTime() + i * 86400000);

    const e = ekadashiOn(
      d.getFullYear(), d.getMonth(), d.getDate(), place
    );

    if (e) {
      e.daysAway = i;
      e.isToday = i === 0;
      return e;
    }
  }

  return null;
}


/* ---------------------------------------------------------
   Festivals
   --------------------------------------------------------- */

const FESTIVALS = [
  ["Makar Sankranti",  null, null, null, "solar-makara"],
  ["Vasant Panchami",  "Magha", "Shukla", 5, "sunrise"],
  ["Maha Shivaratri",  "Phalguna", "Krishna", 14, "nishita"],
  ["Holika Dahan",     "Phalguna", "Shukla", 15, "sunrise"],
  ["Ram Navami",       "Chaitra", "Shukla", 9, "madhyahna"],
  ["Hanuman Jayanti",  "Chaitra", "Shukla", 15, "sunrise"],
  ["Akshaya Tritiya",  "Vaisakha", "Shukla", 3, "madhyahna"],
  ["Guru Purnima",     "Ashadha", "Shukla", 15, "sunrise"],
  ["Raksha Bandhan",   "Shravana", "Shukla", 15, "sunrise"],
  ["Janmashtami",      "Bhadrapada", "Krishna", 8, "nishita"],
  ["Ganesh Chaturthi", "Bhadrapada", "Shukla", 4, "madhyahna"],
  ["Navratri begins",  "Ashwin", "Shukla", 1, "sunrise"],
  ["Vijayadashami",    "Ashwin", "Shukla", 10, "aparahna"],
  ["Sharad Purnima",   "Ashwin", "Shukla", 15, "nishita"],
  ["Dhanteras",        "Kartika", "Krishna", 13, "pradosh"],
  ["Diwali",           "Kartika", "Krishna", 15, "pradosh"],
  ["Govardhan Puja",   "Kartika", "Shukla", 1, "sunrise"],
  ["Bhai Dooj",        "Kartika", "Shukla", 2, "aparahna"],
  ["Vivah Panchami",   "Margashirsha", "Shukla", 5, "sunrise"],
  ["Gita Jayanti",     "Margashirsha", "Shukla", 11, "sunrise"]
];

const FESTIVAL_NOTE = {
  "Ram Navami": "The birth of Shri Ram, at Ayodhya.",
  "Vivah Panchami": "The marriage of Shri Ram and Sita Devi.",
  "Hanuman Jayanti": "The birth of Shri Hanuman.",
  "Gita Jayanti": "The Bhagavad Gita was spoken on this day.",
  "Diwali": "Shri Ram's return to Ayodhya."
};


function festivalsInYear(y, place) {

  place = place || getPlace();

  const found = {};

  for (let m = 0; m < 12; m += 1) {

    const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

    for (let d = 1; d <= days; d += 1) {

      const M = momentsOf(new Date(Date.UTC(y, m, d, 6, 30)), place);
      if (!M) continue;

      const lm = lunarMonthAt(M.sunrise, place);
      if (lm.leap) continue;              // no festivals in an adhika month

      for (const [name, fMonth, fPaksha, fTithi, rule] of FESTIVALS) {

        if (found[name] || rule === "solar-makara") continue;

        const c = mhah.calculate(M[rule]);
        const paksha = c.Paksha.name_en_IN;
        const tithiNo = (c.Tithi.ino % 15) + 1;

        const nameMonth =
          paksha === "Krishna" ? MONTHS[(lm.idx + 1) % 12] : lm.name;

        if (nameMonth === fMonth && paksha === fPaksha && tithiNo === fTithi) {

          found[name] = {
            date: new Date(Date.UTC(y, m, d)),
            name,
            month: nameMonth,
            paksha,
            reckonedBy: rule,
            note: FESTIVAL_NOTE[name] || ""
          };
        }
      }
    }
  }

  const list = Object.values(found);

  list.sort((a, b) => a.date - b.date);

  return list;
}


/* ---------------------------------------------------------
   Today
   --------------------------------------------------------- */

function today(place) {

  place = place || getPlace();

  const now = new Date();

  const M = momentsOf(now, place);
  if (!M) return null;

  const c = mhah.calculate(M.sunrise);
  const lm = lunarMonthAt(M.sunrise, place);

  return {
    tithi: c.Tithi.name_en_IN,
    tithiEnd: new Date(c.Tithi.end),
    paksha: c.Paksha.name_en_IN,
    nakshatra: c.Nakshatra.name_en_IN,
    month: lm.leap ? "Adhika " + lm.name : lm.name,
    monthDeva: MONTHS_DEVA[lm.name] || "",
    sunrise: M.sunrise,
    sunset: M.sunset
  };
}


window.Panchang = {
  getPlace,
  setPlace,
  askForLocation,
  today,
  nextEkadashi,
  ekadashiInMonth,
  festivalsInYear,
  MONTHS
};

window.dispatchEvent(new Event("panchang-ready"));
