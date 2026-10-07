function encodeSolution(sigils) {
  return btoa(unescape(encodeURIComponent(sigils.join("|"))));
}

function decodeSolution(encoded) {
  return decodeURIComponent(escape(atob(encoded))).split("|");
}

// Wordle-style scoring: "green" = right rune, right place; "yellow" = rune is
// in the sequence but elsewhere; "" = not in the sequence.
function score(guess, solution) {
  const result = new Array(guess.length).fill("");
  const remaining = {};
  solution.forEach((s, i) => {
    if (guess[i] === s) result[i] = "green";
    else remaining[s] = (remaining[s] || 0) + 1;
  });
  guess.forEach((g, i) => {
    if (!result[i] && remaining[g] > 0) {
      result[i] = "yellow";
      remaining[g]--;
    }
  });
  return result;
}

(function () {
  const solution = decodeSolution(CONFIG.SOLUTION);
  const dialsEl = document.getElementById("dials");
  const door = document.getElementById("door");
  const lever = document.getElementById("lever");
  const status = document.getElementById("status");
  const attemptsEl = document.getElementById("attempts");
  const historyEl = document.getElementById("history");
  const historyList = document.getElementById("historyList");
  const hintsEl =document.getElementById("hints");
  const hintList = document.getElementById("hintList");
  const reveal = document.getElementById("reveal");
  const state = new Array(CONFIG.dialCount).fill(0);
  let attempts = 0;
  let solved = false;

  document.getElementById("inscription").textContent = CONFIG.inscription;

  const dialButtons = state.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dial";
    btn.addEventListener("click", () => turn(i, 1));
    btn.addEventListener("contextmenu", (e) => { e.preventDefault(); turn(i, -1); });
    dialsEl.appendChild(btn);
    return btn;
  });

  function render() {
    dialButtons.forEach((btn, i) => {
      const glyph = CONFIG.sigils[state[i]];
      const mark = btn.classList.contains("green") ? " Correct place."
        : btn.classList.contains("yellow") ? " In the sequence, wrong place." : "";
      btn.textContent = glyph;
      btn.setAttribute("aria-label", `Dial ${i + 1}: ${glyph}.${mark} Click to change.`);
    });
  }

  function turn(i, dir) {
    if (solved) return;
    const n = CONFIG.sigils.length;
    state[i] = (state[i] + dir + n) % n;
    dialButtons[i].classList.remove("green", "yellow", "tick");
    void dialButtons[i].offsetWidth;
    dialButtons[i].classList.add("tick");
    status.textContent = "";
    render();
  }

  function addHistory(guess, marks) {
    const li = document.createElement("li");
    guess.forEach((g, i) => {
      const span = document.createElement("span");
      span.className = "pip " + marks[i];
      span.textContent = g;
      span.setAttribute("aria-label", `${g}${marks[i] === "green" ? ", correct place" : marks[i] === "yellow" ? ", wrong place" : ", not in sequence"}`);
      li.appendChild(span);
    });
    historyList.appendChild(li);
    historyEl.hidden = false;
  }

  function attempt() {
    if (solved) return;
    attempts++;
    attemptsEl.textContent = `Attempts: ${attempts}`;
    const guess = state.map((s) => CONFIG.sigils[s]);
    const marks = score(guess, solution);
    dialButtons.forEach((btn, i) => {
      btn.classList.remove("green", "yellow");
      if (marks[i]) btn.classList.add(marks[i]);
    });
    render();
    addHistory(guess, marks);

    if (marks.every((m) => m === "green")) {
      solved = true;
      door.classList.add("open");
      lever.disabled = true;
      status.textContent = "Click. The bolts withdraw.";
      document.getElementById("revealText").textContent = CONFIG.revealText;
      reveal.hidden = false;
    } else {
      door.classList.remove("shake");
      void door.offsetWidth;
      door.classList.add("shake");
      const hint = CONFIG.hints[(attempts - 1) % CONFIG.hints.length];
      status.textContent = "The lock holds. Something etched in the door shimmers.";
      if (attempts <= CONFIG.hints.length) {
        const li = document.createElement("li");
        li.textContent = hint;
        hintList.appendChild(li);
        hintsEl.hidden = false;
      } else {
        status.textContent = "The lock holds. " + hint;
      }
    }
  }

  lever.addEventListener("click", attempt);
  render();

  // drifting embers
  const embers = document.getElementById("embers");
  for (let i = 0; i < 30; i++) {
    const e = document.createElement("span");
    e.style.left = Math.random() * 100 + "%";
    e.style.animationDuration = 6 + Math.random() * 8 + "s";
    e.style.animationDelay = -Math.random() * 12 + "s";
    e.style.setProperty("--s", 2 + Math.random() * 4 + "px");
    embers.appendChild(e);
  }
})();
