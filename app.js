const STORAGE_KEY = "bubble-gum-indulgence-state";

const gums = [
  {
    id: "starter",
    name: "Starter Packet",
    shortName: "SP",
    description: "The worst kind for big bubbles.",
    price: 0,
    color: "#ffd166",
    power: 1,
    shrink: 1,
  },
  {
    id: "strawberry-snap",
    name: "Strawberry Snap",
    shortName: "SS",
    description: "A sweeter chew with cleaner stretch.",
    price: 25,
    color: "#ff7ab8",
    power: 1.22,
    shrink: 0.92,
  },
  {
    id: "mint-cloud",
    name: "Mint Cloud",
    shortName: "MC",
    description: "Cooler, smoother, easier to control.",
    price: 55,
    color: "#2fc7a6",
    power: 1.46,
    shrink: 0.84,
  },
  {
    id: "blueberry-gloss",
    name: "Blueberry Gloss",
    shortName: "BG",
    description: "Elastic shine for bigger bubbles.",
    price: 95,
    color: "#4da3ff",
    power: 1.7,
    shrink: 0.76,
  },
];

const defaultState = {
  money: 60,
  inventory: ["starter"],
  selectedGumId: "starter",
  bestBubble: 0,
};

let state = loadState();
let game = {
  active: false,
  slider: 50,
  safeInset: 0,
  direction: 0,
  rounds: 0,
  bubbleSize: 0,
  lastTimestamp: 0,
  targetEdge: "right",
  animationFrame: null,
};

const elements = {
  moneyAmount: document.querySelector("#moneyAmount"),
  inventoryCount: document.querySelector("#inventoryCount"),
  inventoryList: document.querySelector("#inventoryList"),
  shopList: document.querySelector("#shopList"),
  selectedGumName: document.querySelector("#selectedGumName"),
  roundCount: document.querySelector("#roundCount"),
  bestBubble: document.querySelector("#bestBubble"),
  bubble: document.querySelector("#bubble"),
  bubbleSizeLabel: document.querySelector("#bubbleSizeLabel"),
  packInitials: document.querySelector("#packInitials"),
  startButton: document.querySelector("#startButton"),
  gameStatus: document.querySelector("#gameStatus"),
  meter: document.querySelector("#meter"),
  safeZone: document.querySelector("#safeZone"),
  leftDanger: document.querySelector("#leftDanger"),
  rightDanger: document.querySelector("#rightDanger"),
  slider: document.querySelector("#slider"),
  moveLeft: document.querySelector("#moveLeft"),
  moveRight: document.querySelector("#moveRight"),
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.inventory)) {
      return { ...defaultState };
    }

    const inventory = [...new Set(["starter", ...saved.inventory])].filter((gumId) =>
      gums.some((gum) => gum.id === gumId)
    );

    return {
      money: Number.isFinite(saved.money) ? saved.money : defaultState.money,
      inventory,
      selectedGumId: inventory.includes(saved.selectedGumId) ? saved.selectedGumId : "starter",
      bestBubble: Number.isFinite(saved.bestBubble) ? saved.bestBubble : 0,
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getSelectedGum() {
  return gums.find((gum) => gum.id === state.selectedGumId) ?? gums[0];
}

function render() {
  const selectedGum = getSelectedGum();

  elements.moneyAmount.textContent = `$${state.money}`;
  elements.inventoryCount.textContent = `${state.inventory.length} ${state.inventory.length === 1 ? "piece" : "pieces"}`;
  elements.selectedGumName.textContent = selectedGum.name;
  elements.bestBubble.textContent = state.bestBubble;
  elements.packInitials.textContent = selectedGum.shortName;
  elements.bubble.style.setProperty("--bubble-size", `${118 + game.bubbleSize * 6}px`);
  elements.bubble.style.borderColor = selectedGum.color;
  elements.bubbleSizeLabel.textContent = Math.round(game.bubbleSize);
  elements.roundCount.textContent = game.rounds;

  renderInventory();
  renderShop();
  renderMeter();
}

function renderInventory() {
  elements.inventoryList.innerHTML = "";

  state.inventory.forEach((gumId) => {
    const gum = gums.find((item) => item.id === gumId);
    if (!gum) return;

    const card = document.createElement("article");
    card.className = `gum-card${gum.id === state.selectedGumId ? " selected" : ""}`;
    card.innerHTML = `
      <div class="gum-swatch" style="background:${gum.color}">${gum.shortName}</div>
      <div>
        <h3>${gum.name}</h3>
        <p>${gum.description}</p>
      </div>
      <button class="secondary" type="button">${gum.id === state.selectedGumId ? "Selected" : "Use"}</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      state.selectedGumId = gum.id;
      saveState();
      render();
    });

    elements.inventoryList.append(card);
  });
}

function renderShop() {
  elements.shopList.innerHTML = "";

  gums
    .filter((gum) => gum.id !== "starter")
    .forEach((gum) => {
      const owned = state.inventory.includes(gum.id);
      const canBuy = state.money >= gum.price;
      const card = document.createElement("article");
      card.className = "gum-card";
      card.innerHTML = `
        <div class="gum-swatch" style="background:${gum.color}">${gum.shortName}</div>
        <div>
          <h3>${gum.name}</h3>
          <p>$${gum.price} · ${gum.description}</p>
        </div>
        <button type="button" ${owned || !canBuy ? "disabled" : ""}>${owned ? "Owned" : "Buy"}</button>
      `;

      card.querySelector("button").addEventListener("click", () => buyGum(gum.id));
      elements.shopList.append(card);
    });
}

function buyGum(gumId) {
  const gum = gums.find((item) => item.id === gumId);
  if (!gum || state.inventory.includes(gumId) || state.money < gum.price) return;

  state.money -= gum.price;
  state.inventory.push(gumId);
  state.selectedGumId = gumId;
  saveState();
  render();
}

function renderMeter() {
  elements.meter.style.setProperty("--slider-position", `${game.slider}%`);
  elements.meter.style.setProperty("--safe-left", `${game.safeInset}%`);
  elements.meter.style.setProperty("--safe-right", `${game.safeInset}%`);
  elements.meter.style.setProperty("--danger-width", `${game.safeInset}%`);
  elements.moveLeft.classList.toggle("active", game.direction < 0);
  elements.moveRight.classList.toggle("active", game.direction > 0);
}

function startGame() {
  if (game.active) {
    finishGame("Round stopped. Your bubble holds for now.");
    return;
  }

  game = {
    active: true,
    slider: 50,
    safeInset: 0,
    direction: 0,
    rounds: 0,
    bubbleSize: 0,
    lastTimestamp: performance.now(),
    targetEdge: "right",
    animationFrame: null,
  };

  elements.startButton.textContent = "Stop";
  elements.gameStatus.textContent = "Use Left and Right, or your arrow keys, to sweep side to side.";
  elements.bubble.classList.remove("pop");
  render();
  game.animationFrame = requestAnimationFrame(tick);
}

function tick(timestamp) {
  if (!game.active) return;

  const selectedGum = getSelectedGum();
  const delta = Math.min((timestamp - game.lastTimestamp) / 1000, 0.05);
  game.lastTimestamp = timestamp;
  game.safeInset += delta * 5.6 * selectedGum.shrink;
  game.slider += game.direction * delta * 54;

  const min = game.safeInset;
  const max = 100 - game.safeInset;

  if (game.slider < min || game.slider > max || min >= 42) {
    finishGame("Pop. The safe zone closed before the slider stayed inside.");
    return;
  }

  if (game.targetEdge === "right" && game.slider >= max - 1.5) {
    scoreRound("left", selectedGum);
  } else if (game.targetEdge === "left" && game.slider <= min + 1.5) {
    scoreRound("right", selectedGum);
  }

  render();
  game.animationFrame = requestAnimationFrame(tick);
}

function scoreRound(nextEdge, gum) {
  game.rounds += 1;
  game.bubbleSize = Math.round((game.bubbleSize + 4.5 * gum.power) * 10) / 10;
  game.targetEdge = nextEdge;
  elements.gameStatus.textContent = `Nice sweep. Head ${nextEdge} before the walls close.`;
}

function finishGame(message) {
  game.active = false;
  elements.startButton.textContent = "Start";
  elements.gameStatus.textContent = `${message} Final bubble size: ${Math.round(game.bubbleSize)}.`;
  cancelAnimationFrame(game.animationFrame);

  if (Math.round(game.bubbleSize) > state.bestBubble) {
    state.bestBubble = Math.round(game.bubbleSize);
    saveState();
  }

  elements.bubble.classList.add("pop");
  setTimeout(() => elements.bubble.classList.remove("pop"), 430);
  render();
}

function setDirection(direction) {
  if (!game.active) return;
  game.direction = direction;
  renderMeter();
}

elements.startButton.addEventListener("click", startGame);
elements.moveLeft.addEventListener("pointerdown", () => setDirection(-1));
elements.moveRight.addEventListener("pointerdown", () => setDirection(1));
elements.moveLeft.addEventListener("pointerenter", (event) => {
  if (event.buttons === 1) setDirection(-1);
});
elements.moveRight.addEventListener("pointerenter", (event) => {
  if (event.buttons === 1) setDirection(1);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    setDirection(-1);
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    event.preventDefault();
    setDirection(1);
  }

  if (event.key === " " && !event.repeat) {
    event.preventDefault();
    startGame();
  }
});

render();
