const STORAGE_KEY = "bubble-gum-indulgence-v2";
const STREAK_RUNS_REQUIRED = 3;
const MULTIPLIER_TIERS = [
  { seconds: 22, multiplier: 10, name: "Ultra" },
  { seconds: 16, multiplier: 5, name: "Super" },
  { seconds: 12, multiplier: 2, name: "Boost" },
];

const gums = [
  {
    id: "starter",
    name: "Starter Slab",
    shortName: "SS",
    flavor: "Thin, stiff, and barely bubble-ready.",
    price: 0,
    color: "#ffd45d",
    wallSpeed: 1,
    yieldMultiplier: 1,
    maxBubble: 210,
    steerSpeed: 48,
    collisionPadding: 1.6,
    bubbleGrowth: 1,
    perk: "Classic Chew: balanced starter stats.",
    tier: 1,
  },
  {
    id: "pink-pop",
    name: "Pink Pop Roll",
    shortName: "PP",
    flavor: "A softer chew with better stretch and sparkle.",
    price: 35,
    color: "#ff78ba",
    wallSpeed: 0.9,
    yieldMultiplier: 1.28,
    maxBubble: 250,
    steerSpeed: 58,
    collisionPadding: 1.6,
    bubbleGrowth: 1,
    perk: "Sugar Sprint: 21% faster steering.",
    tier: 2,
  },
  {
    id: "mint-orbit",
    name: "Mint Orbit",
    shortName: "MO",
    flavor: "Cool control for longer survival runs.",
    price: 90,
    color: "#27c69f",
    wallSpeed: 0.78,
    yieldMultiplier: 1.62,
    maxBubble: 295,
    steerSpeed: 46,
    collisionPadding: 1.6,
    bubbleGrowth: 1,
    perk: "Cool Down: walls close 22% slower.",
    tier: 3,
  },
  {
    id: "citrus-zip",
    name: "Citrus Zip",
    shortName: "CZ",
    flavor: "Sharp lemon-lime gum made for rapid saves.",
    price: 130,
    color: "#b8e52f",
    wallSpeed: 0.92,
    yieldMultiplier: 1.72,
    maxBubble: 275,
    steerSpeed: 68,
    collisionPadding: 1.6,
    bubbleGrowth: 0.95,
    perk: "Zest Boost: fastest steering in the shop.",
    tier: 3,
  },
  {
    id: "blue-burst",
    name: "Blue Burst Tape",
    shortName: "BB",
    flavor: "Elastic tape gum with strong earning potential.",
    price: 175,
    color: "#51a8ff",
    wallSpeed: 0.66,
    yieldMultiplier: 2.1,
    maxBubble: 340,
    steerSpeed: 48,
    collisionPadding: 1.6,
    bubbleGrowth: 1,
    perk: "Cash Splash: earns 2.10x cash each second.",
    tier: 4,
  },
  {
    id: "grape-guard",
    name: "Grape Guard",
    shortName: "GG",
    flavor: "Deep grape with a thick, protective chew.",
    price: 250,
    color: "#7048d8",
    wallSpeed: 0.74,
    yieldMultiplier: 1.9,
    maxBubble: 325,
    steerSpeed: 44,
    collisionPadding: 0.6,
    bubbleGrowth: 1,
    perk: "Soft Landing: a smaller hitbox forgives close calls.",
    tier: 4,
  },
  {
    id: "hyper-gloss",
    name: "Hyper Gloss",
    shortName: "HG",
    flavor: "Glossy arcade-grade gum built for huge bubbles.",
    price: 340,
    color: "#b56cff",
    wallSpeed: 0.56,
    yieldMultiplier: 2.8,
    maxBubble: 380,
    steerSpeed: 50,
    collisionPadding: 1.6,
    bubbleGrowth: 1.35,
    perk: "Mega Stretch: bubbles grow 35% faster.",
    tier: 5,
  },
  {
    id: "watermelon-rush",
    name: "Watermelon Rush",
    shortName: "WR",
    flavor: "Juicy watermelon for fearless high-speed runs.",
    price: 475,
    color: "#ff4f68",
    wallSpeed: 1.08,
    yieldMultiplier: 4.2,
    maxBubble: 360,
    steerSpeed: 56,
    collisionPadding: 1.6,
    bubbleGrowth: 1.15,
    perk: "Double Trouble: fast walls, massive 4.20x earnings.",
    tier: 5,
  },
  {
    id: "cola-float",
    name: "Cola Float",
    shortName: "CF",
    flavor: "Fizzy cola gum that keeps pressure low and steady.",
    price: 650,
    color: "#8d5a3a",
    wallSpeed: 0.46,
    yieldMultiplier: 2.45,
    maxBubble: 405,
    steerSpeed: 42,
    collisionPadding: 1.6,
    bubbleGrowth: 0.9,
    perk: "Slow Fizz: slowest closing walls for marathon runs.",
    tier: 6,
  },
  {
    id: "rainbow-reactor",
    name: "Rainbow Reactor",
    shortName: "RR",
    flavor: "A shifting fruit mix with endgame-level power.",
    price: 950,
    color: "#12b8d4",
    wallSpeed: 0.68,
    yieldMultiplier: 3.65,
    maxBubble: 465,
    steerSpeed: 62,
    collisionPadding: 1.1,
    bubbleGrowth: 1.2,
    perk: "Flavor Fusion: speed, safety, growth, and cash combine.",
    tier: 7,
  },
];

const flavorCatalog = [
  ["apple-crisp", "Apple Crisp", "AC", "Tart green apple with a snappy finish.", 1150, "#8fcf45", 0.66, 3.8, 475, 65, 1.2, 1.12, "Orchard Dash: quick steering with steady walls.", 7],
  ["banana-split", "Banana Split", "BS", "Creamy banana layered with sundae sweetness.", 1350, "#f4d84f", 0.6, 3.95, 490, 46, 0.9, 1.34, "Sundae Stack: rapid growth and extra close-call room.", 8],
  ["cherry-bomb", "Cherry Bomb", "CB", "Bright cherry flavor built for risky runs.", 1550, "#e93452", 1.12, 5.7, 480, 70, 1.7, 1.18, "Pit Stopper: dangerous walls pay a huge cash premium.", 8],
  ["peach-fizz", "Peach Fizz", "PF", "Soft peach with a sparkling soda snap.", 1750, "#ff9b71", 0.58, 4.1, 505, 52, 1.3, 1.08, "Fuzzy Fizz: relaxed walls and balanced handling.", 8],
  ["mango-tango", "Mango Tango", "MT", "Ripe mango gum with an energetic bounce.", 1950, "#ffae32", 0.78, 4.6, 515, 72, 1.5, 1.2, "Tango Turn: sharp direction changes and fast growth.", 8],
  ["pineapple-punch", "Pineapple Punch", "PP", "Tangy pineapple with a heavyweight chew.", 2200, "#e8c629", 0.52, 4.25, 530, 43, 0.55, 1.02, "Spiky Shield: tiny hitbox with slow, deliberate steering.", 9],
  ["raspberry-ripple", "Raspberry Ripple", "RA", "Sweet raspberry folded through creamy gum.", 2450, "#d83b83", 0.69, 4.75, 540, 59, 1.05, 1.3, "Ripple Rise: bubbles swell quickly without wild controls.", 9],
  ["blackberry-velvet", "Blackberry Velvet", "BV", "Dark berry flavor with a smooth finish.", 2700, "#51336f", 0.44, 4.35, 555, 40, 0.7, 0.94, "Velvet Time: ultra-slow walls reward patient steering.", 9],
  ["coconut-cloud", "Coconut Cloud", "CC", "Airy coconut cream with a soft chew.", 2950, "#eee4d0", 0.55, 4.5, 570, 48, 0.45, 1.12, "Cloud Cushion: the most forgiving collision window.", 9],
  ["kiwi-kick", "Kiwi Kick", "KK", "Tart kiwi with a fast electric bite.", 3200, "#75bc3f", 0.86, 5.2, 510, 78, 1.8, 1.08, "Seed Speed: lightning steering for expert reactions.", 10],
  ["dragonfruit-dream", "Dragonfruit Dream", "DD", "Tropical dragonfruit with a neon finish.", 3450, "#f14da4", 0.62, 5.05, 585, 61, 1.0, 1.28, "Dream Scale: a high cap paired with silky growth.", 10],
  ["passionfruit-pulse", "Passionfruit Pulse", "PA", "Sharp passionfruit that hums with energy.", 3700, "#ef7f2d", 0.9, 6.1, 525, 74, 1.6, 1.25, "Pulse Pay: speed and pressure amplify every dollar.", 10],
  ["pomegranate-pop", "Pomegranate Pop", "PG", "Ruby pomegranate packed with tart juice.", 3950, "#b7284f", 0.71, 5.45, 550, 56, 0.8, 1.42, "Ruby Bloom: explosive growth with a tighter hitbox.", 10],
  ["lychee-light", "Lychee Light", "LL", "Floral lychee gum that feels nearly weightless.", 4200, "#f3a9ba", 0.57, 4.9, 545, 69, 1.25, 1.05, "Feather Touch: fast steering without extra wall pressure.", 11],
  ["guava-groove", "Guava Groove", "GG", "Pink guava with an easy tropical rhythm.", 4450, "#f26f78", 0.64, 5.3, 565, 54, 0.95, 1.22, "Groove Guard: smooth all-around survival bonuses.", 11],
  ["papaya-punch", "Papaya Punch", "PY", "Sweet papaya with a bold arcade punch.", 4700, "#f38b45", 0.82, 6.35, 535, 67, 1.45, 1.33, "Tropical Uppercut: fast growth and premium earnings.", 11],
  ["plum-jam", "Plum Jam", "PJ", "Rich plum preserves in a dense chew.", 4950, "#7e3f74", 0.49, 5.0, 590, 41, 0.5, 1.14, "Jam Session: slow walls and forgiving edges.", 11],
  ["pear-spark", "Pear Spark", "PS", "Crisp pear with a clean sparkling finish.", 5200, "#b4d65c", 0.68, 5.65, 560, 76, 1.9, 0.98, "Spark Step: extreme control speed for tight lanes.", 12],
  ["tangerine-twist", "Tangerine Twist", "TT", "Juicy citrus gum with a twisting snap.", 5450, "#f47a24", 0.76, 6.0, 575, 73, 1.15, 1.18, "Citrus Corkscrew: agile handling with strong yield.", 12],
  ["blueberry-muffin", "Blueberry Muffin", "BM", "Warm blueberry pastry with a soft center.", 5700, "#5266b7", 0.54, 5.35, 610, 45, 0.65, 1.38, "Muffin Top: oversized bubbles grow rapidly.", 12],
  ["strawberry-shortcake", "Strawberry Shortcake", "SC", "Fresh berries, cream, and fluffy cake.", 6000, "#ed5f78", 0.63, 5.85, 600, 58, 0.85, 1.45, "Cake Lift: dessert-soft gum expands with ease.", 12],
  ["lemon-tart", "Lemon Tart", "LT", "Sharp lemon curd in a buttery chew.", 6300, "#ebcf38", 0.8, 6.65, 550, 75, 1.55, 1.15, "Tart Reflex: fast controls turn pressure into cash.", 13],
  ["key-lime-pie", "Key Lime Pie", "KL", "Creamy lime with a crumbly graham finish.", 6600, "#9ed45d", 0.5, 5.55, 620, 47, 0.75, 1.26, "Lime Leisure: slow walls and dependable growth.", 13],
  ["chocolate-truffle", "Chocolate Truffle", "CT", "Dark chocolate with a luxurious dense chew.", 6900, "#68422f", 0.43, 5.4, 640, 39, 0.4, 1.08, "Truffle Armor: maximum safety for marathon runs.", 13],
  ["vanilla-swirl", "Vanilla Swirl", "VS", "Classic vanilla cream with a silky texture.", 7200, "#ead9b7", 0.59, 6.05, 605, 63, 1.0, 1.18, "Silky Swirl: every stat stays comfortably balanced.", 13],
  ["caramel-crunch", "Caramel Crunch", "CR", "Golden caramel with a crisp candy finish.", 7500, "#c78332", 0.84, 7.1, 570, 66, 1.35, 1.4, "Crunch Time: quick growth under profitable pressure.", 14],
  ["cotton-candy", "Cotton Candy", "CA", "Spun sugar sweetness in a featherlight chew.", 7800, "#ef86ca", 0.65, 6.2, 650, 77, 1.75, 1.02, "Sugar Glide: effortless steering across wide lanes.", 14],
  ["cinnamon-roll", "Cinnamon Roll", "CN", "Warm cinnamon icing with a stretchy spiral.", 8100, "#b96c43", 0.61, 6.4, 635, 53, 0.9, 1.5, "Spiral Rise: fastest dessert bubble growth.", 14],
  ["cookie-dough", "Cookie Dough", "CD", "Brown sugar dough packed with chocolate chips.", 8400, "#b78658", 0.47, 5.95, 660, 42, 0.6, 1.2, "Dough Shield: slow walls and a compact hitbox.", 14],
  ["birthday-cake", "Birthday Cake", "BC", "Vanilla cake batter loaded with rainbow sprinkles.", 8700, "#df7eb9", 0.7, 7.25, 625, 64, 1.1, 1.35, "Party Bonus: celebratory yield with lively growth.", 15],
  ["red-velvet", "Red Velvet", "RV", "Cocoa cake with a smooth cream-cheese finish.", 9000, "#a62d45", 0.48, 6.5, 675, 44, 0.52, 1.28, "Velvet Rope: premium safety and a towering cap.", 15],
  ["brownie-batter", "Brownie Batter", "BB", "Fudgy chocolate batter with serious stretch.", 9300, "#58382e", 0.56, 7.0, 665, 50, 0.72, 1.52, "Fudge Surge: dense gum produces giant bubbles fast.", 15],
  ["honeycomb", "Honeycomb", "HC", "Golden honey with tiny caramelized bubbles.", 9600, "#daa928", 0.67, 7.55, 610, 71, 1.4, 1.17, "Hive Hustle: agile control and sweet cash yield.", 15],
  ["marshmallow-melt", "Marshmallow Melt", "MM", "Toasted marshmallow with a pillowy chew.", 9900, "#f0d7cb", 0.42, 6.15, 690, 38, 0.35, 1.24, "Pillow Guard: safest hitbox and calmest walls.", 16],
  ["toffee-apple", "Toffee Apple", "TA", "Crisp apple sealed in hard caramel.", 10200, "#b85b34", 0.94, 8.4, 600, 74, 1.65, 1.3, "Candied Risk: intense pressure delivers elite payout.", 16],
  ["maple-donut", "Maple Donut", "MD", "Maple glaze over a soft doughy chew.", 10500, "#bd7a3c", 0.53, 6.85, 680, 49, 0.68, 1.36, "Glaze Phase: long runs steadily inflate huge bubbles.", 16],
  ["mocha-mousse", "Mocha Mousse", "MO", "Coffee chocolate whipped into an airy gum.", 10800, "#765043", 0.46, 7.15, 700, 45, 0.48, 1.16, "Cafe Focus: slow walls sharpen high-value runs.", 16],
  ["tiramisu-twist", "Tiramisu Twist", "TI", "Espresso cream layered with cocoa sweetness.", 11100, "#9a6b50", 0.6, 7.7, 675, 60, 0.82, 1.44, "Layer Up: strong growth and earnings climb together.", 17],
  ["churro-charge", "Churro Charge", "CH", "Cinnamon sugar with a crackling fried-dough bite.", 11400, "#c98a46", 1.16, 10.2, 620, 80, 2.0, 1.38, "Sugar Rush: maximum danger, speed, and cash.", 17],
  ["macaron-magic", "Macaron Magic", "MA", "Almond cookie shells with a berry cream center.", 11700, "#b57edc", 0.51, 7.45, 710, 57, 0.58, 1.48, "Shell Spell: forgiving edges protect rapid growth.", 17],
  ["cheesecake-chill", "Cheesecake Chill", "CK", "Cool cream cheese with a berry ribbon.", 12000, "#e8cfa8", 0.4, 6.8, 720, 41, 0.42, 1.1, "Chill Slice: lowest wall pressure for record attempts.", 17],
  ["smores-stretch", "S'mores Stretch", "SM", "Chocolate, graham, and toasted marshmallow.", 12300, "#8c5a3d", 0.57, 8.0, 705, 52, 0.7, 1.55, "Campfire Pull: unmatched elasticity and bubble growth.", 18],
  ["pudding-pop", "Pudding Pop", "PD", "Cold chocolate pudding with a nostalgic snap.", 12600, "#6f4938", 0.45, 7.3, 730, 43, 0.5, 1.32, "Pudding Pause: calm walls with a generous size cap.", 18],
  ["sorbet-splash", "Sorbet Splash", "SS", "Icy mixed fruit with a bright acidic finish.", 12900, "#ef4f87", 0.73, 8.65, 680, 79, 1.5, 1.25, "Frozen Flash: ultra-fast steering and rich rewards.", 18],
  ["gelato-glow", "Gelato Glow", "GL", "Creamy rainbow gelato with a luminous chew.", 13200, "#38b9b0", 0.5, 8.2, 740, 62, 0.62, 1.5, "Final Scoop: endgame safety, growth, and yield unite.", 18],
];

gums.push(
  ...flavorCatalog.map(
    ([id, name, shortName, flavor, price, color, wallSpeed, yieldMultiplier, maxBubble, steerSpeed, collisionPadding, bubbleGrowth, perk, tier]) => ({
      id,
      name,
      shortName,
      flavor,
      price,
      color,
      wallSpeed,
      yieldMultiplier,
      maxBubble,
      steerSpeed,
      collisionPadding,
      bubbleGrowth,
      perk,
      tier,
    })
  )
);

const defaultState = {
  cash: 0,
  unlocked: ["starter"],
  activeGumId: "starter",
  bestTime: 0,
  bestBubble: 0,
  streakTimes: [],
  nextRoundMultiplier: 1,
};

let state = loadState();
let inputDirection = 1;
let audioContext = null;
let game = createIdleGame();

const els = {
  arcade: document.querySelector("#arcade"),
  cash: document.querySelector("#cash"),
  bestTime: document.querySelector("#bestTime"),
  shopButton: document.querySelector("#shopButton"),
  bubbleZone: document.querySelector("#bubbleZone"),
  bubble: document.querySelector("#bubble"),
  bubbleText: document.querySelector("#bubbleText"),
  gumLabel: document.querySelector("#gumLabel"),
  timer: document.querySelector("#timer"),
  roundCash: document.querySelector("#roundCash"),
  equippedName: document.querySelector("#equippedName"),
  multiplier: document.querySelector("#multiplier"),
  streakText: document.querySelector("#streakText"),
  streakPips: [...document.querySelectorAll(".streak-pip")],
  track: document.querySelector("#track"),
  controlChip: document.querySelector("#controlChip"),
  playButton: document.querySelector("#playButton"),
  leftButton: document.querySelector("#leftButton"),
  rightButton: document.querySelector("#rightButton"),
  gumTier: document.querySelector("#gumTier"),
  packArt: document.querySelector("#packArt"),
  currentGumName: document.querySelector("#currentGumName"),
  currentGumFlavor: document.querySelector("#currentGumFlavor"),
  wallSpeedStat: document.querySelector("#wallSpeedStat"),
  yieldStat: document.querySelector("#yieldStat"),
  capStat: document.querySelector("#capStat"),
  perkStat: document.querySelector("#perkStat"),
  inventoryCount: document.querySelector("#inventoryCount"),
  inventory: document.querySelector("#inventory"),
  summaryModal: document.querySelector("#summaryModal"),
  summaryTitle: document.querySelector("#summaryTitle"),
  summaryTime: document.querySelector("#summaryTime"),
  summaryCash: document.querySelector("#summaryCash"),
  summaryCashLabel: document.querySelector("#summaryCashLabel"),
  summaryTotal: document.querySelector("#summaryTotal"),
  playAgainButton: document.querySelector("#playAgainButton"),
  shopModal: document.querySelector("#shopModal"),
  closeShopButton: document.querySelector("#closeShopButton"),
  shopList: document.querySelector("#shopList"),
  shopSearch: document.querySelector("#shopSearch"),
  recordBurst: document.querySelector("#recordBurst"),
  toast: document.querySelector("#toast"),
};

let toastTimeout = null;

function createIdleGame() {
  return {
    active: false,
    animationFrame: null,
    startedAt: 0,
    lastFrameAt: 0,
    elapsed: 0,
    cashEarned: 0,
    chip: 50,
    leftWall: 0,
    rightWall: 0,
    bubbleSize: 140,
    speedScale: 1,
    rewardMultiplier: 1,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.unlocked)) return { ...defaultState };

    const unlocked = [...new Set(["starter", ...saved.unlocked])].filter((id) =>
      gums.some((gum) => gum.id === id)
    );

    return {
      cash: Number.isFinite(saved.cash) ? saved.cash : 0,
      unlocked,
      activeGumId: unlocked.includes(saved.activeGumId) ? saved.activeGumId : "starter",
      bestTime: Number.isFinite(saved.bestTime) ? saved.bestTime : 0,
      bestBubble: Number.isFinite(saved.bestBubble) ? saved.bestBubble : 0,
      streakTimes: Array.isArray(saved.streakTimes)
        ? saved.streakTimes
            .filter(Number.isFinite)
            .slice(-(STREAK_RUNS_REQUIRED - 1))
        : Array(Math.max(0, Math.min(saved.streakCount || 0, STREAK_RUNS_REQUIRED - 1))).fill(12),
      nextRoundMultiplier: [2, 5, 10].includes(saved.nextRoundMultiplier)
        ? saved.nextRoundMultiplier
        : 1,
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activeGum() {
  return gums.find((gum) => gum.id === state.activeGumId) || gums[0];
}

function formatMoney(value) {
  return `$${Math.floor(value)}`;
}

function formatTime(value) {
  return `${value.toFixed(1)}s`;
}

function multiplierForTime(seconds) {
  return MULTIPLIER_TIERS.find((tier) => seconds >= tier.seconds)?.multiplier || 1;
}

function multiplierTone(multiplier) {
  if (multiplier === 10) return "ultra";
  if (multiplier >= 5) return "bonus";
  return "success";
}

function multiplierName(multiplier) {
  if (multiplier === 10) return "Ultra";
  if (multiplier === 5) return "Super";
  if (multiplier === 2) return "Double";
  return "Standard";
}

function payoutPhrase(multiplier) {
  if (multiplier === 10) return "ten times the cash";
  if (multiplier === 5) return "five times the cash";
  if (multiplier === 2) return "double cash";
  return "normal cash";
}

function readableTextColor(hexColor) {
  const hex = hexColor.replace("#", "");
  const value = Number.parseInt(hex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
  return brightness > 150 ? "#211820" : "#ffffff";
}

function render() {
  const gum = activeGum();
  const bubbleSize = game.active ? game.bubbleSize : Math.max(140, Math.min(state.bestBubble || 150, gum.maxBubble));

  els.cash.textContent = formatMoney(state.cash);
  els.bestTime.textContent = formatTime(state.bestTime);
  els.timer.textContent = formatTime(game.elapsed);
  els.roundCash.textContent = formatMoney(game.cashEarned);
  els.equippedName.textContent = gum.name;
  const visibleMultiplier = game.active ? game.rewardMultiplier : state.nextRoundMultiplier;
  els.multiplier.textContent = `${visibleMultiplier}x`;
  els.multiplier.classList.toggle("bonus", visibleMultiplier > 1);
  els.multiplier.classList.toggle("ultra", visibleMultiplier === 10);
  els.streakText.textContent = state.nextRoundMultiplier > 1
    ? `${multiplierName(state.nextRoundMultiplier)} boost ready`
    : state.streakTimes.length === 2
      ? "Two great runs in a row"
      : state.streakTimes.length === 1
        ? "One great run"
        : "Start your streak";
  els.streakPips.forEach((pip, index) => {
    pip.classList.toggle("active", state.nextRoundMultiplier > 1 || index < state.streakTimes.length);
  });
  els.bubbleText.textContent = game.active ? formatTime(game.elapsed) : "Ready";
  els.gumLabel.textContent = gum.name;
  els.arcade.style.setProperty("--gum-color", gum.color);
  els.arcade.style.setProperty("--gum-ink", readableTextColor(gum.color));
  els.bubble.style.setProperty("--bubble-size", `${bubbleSize}px`);
  els.track.style.setProperty("--left-wall", `${game.leftWall}%`);
  els.track.style.setProperty("--right-wall", `${game.rightWall}%`);
  els.track.style.setProperty("--chip-x", `${game.chip}%`);
  els.leftButton.classList.toggle("active", inputDirection < 0);
  els.rightButton.classList.toggle("active", inputDirection > 0);
  els.playButton.textContent = game.active ? "Inflating..." : "Start attempt";
  els.playButton.disabled = game.active;

  renderEquipped(gum);
}

function renderEquipped(gum) {
  els.gumTier.textContent = `Tier ${gum.tier}`;
  els.packArt.textContent = gum.shortName;
  els.packArt.style.background = gum.color;
  els.currentGumName.textContent = gum.name;
  els.currentGumFlavor.textContent = gum.flavor;
  els.wallSpeedStat.textContent = `${gum.wallSpeed.toFixed(2)}x`;
  els.yieldStat.textContent = `${gum.yieldMultiplier.toFixed(2)}x`;
  els.capStat.textContent = `${gum.maxBubble}px`;
  els.perkStat.textContent = gum.perk;
}

function renderInventory() {
  els.inventoryCount.textContent = `${state.unlocked.length} owned`;
  els.inventory.innerHTML = "";

  state.unlocked.forEach((id) => {
    const gum = gums.find((item) => item.id === id);
    if (!gum) return;

    const item = document.createElement("button");
    item.type = "button";
    item.className = `inventory-item${gum.id === state.activeGumId ? " equipped" : ""}`;
    item.innerHTML = `
      <span class="pack-art" style="background:${gum.color}">${gum.shortName}</span>
      <span>
        <strong>${gum.name}</strong>
        <p>${gum.id === state.activeGumId ? "Equipped" : "Tap to equip"}</p>
      </span>
    `;
    item.addEventListener("click", () => equipGum(gum.id));
    els.inventory.append(item);
  });
}

function renderShop() {
  els.shopList.innerHTML = "";
  const searchTerm = els.shopSearch.value.trim().toLowerCase();

  gums
    .filter((gum) => `${gum.name} ${gum.flavor} ${gum.perk}`.toLowerCase().includes(searchTerm))
    .forEach((gum) => {
    const owned = state.unlocked.includes(gum.id);
    const canBuy = state.cash >= gum.price;
    const card = document.createElement("article");
    card.className = "shop-item";
    card.innerHTML = `
      <div class="pack-art" style="background:${gum.color}">${gum.shortName}</div>
      <div>
        <h3>${gum.name}</h3>
        <p>${gum.flavor}</p>
        <p class="perk-copy">${gum.perk}</p>
        <div class="shop-stats">
          <span>${formatMoney(gum.price)}</span>
          <span>${gum.wallSpeed.toFixed(2)}x walls</span>
          <span>${gum.yieldMultiplier.toFixed(2)}x yield</span>
          <span>${gum.maxBubble}px cap</span>
        </div>
        <button class="gum-action${owned ? " secondary" : ""}" type="button" ${!owned && !canBuy ? "disabled" : ""}>
          ${owned ? (gum.id === state.activeGumId ? "Equipped" : "Equip") : "Buy"}
        </button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => {
      if (owned) {
        equipGum(gum.id);
      } else {
        buyGum(gum.id);
      }
    });

    els.shopList.append(card);
  });
}

function equipGum(id) {
  if (!state.unlocked.includes(id)) return;
  state.activeGumId = id;
  saveState();
  render();
  renderInventory();
  renderShop();
}

function buyGum(id) {
  const gum = gums.find((item) => item.id === id);
  if (!gum || state.unlocked.includes(id) || state.cash < gum.price) return;

  state.cash -= gum.price;
  state.unlocked.push(id);
  state.activeGumId = id;
  saveState();
  playTone(680, 0.09, "triangle", 0.05);
  render();
  renderInventory();
  renderShop();
}

function startAttempt() {
  const now = performance.now();
  const rewardMultiplier = state.nextRoundMultiplier;
  inputDirection = 1;
  game = {
    ...createIdleGame(),
    active: true,
    startedAt: now,
    lastFrameAt: now,
    chip: 50,
    bubbleSize: 140,
    rewardMultiplier,
  };
  hideSummary();
  playTone(420, 0.08, "sine", 0.04);
  render();
  if (rewardMultiplier > 1) {
    showToast(`${multiplierName(rewardMultiplier)} cash boost is active!`, multiplierTone(rewardMultiplier));
    playTone(rewardMultiplier === 10 ? 980 : rewardMultiplier === 5 ? 860 : 760, 0.12, "triangle", 0.05);
  }
  game.animationFrame = requestAnimationFrame(tick);
}

function tick(now) {
  if (!game.active) return;

  const gum = activeGum();
  const delta = Math.min((now - game.lastFrameAt) / 1000, 0.05);
  game.lastFrameAt = now;
  game.elapsed = (now - game.startedAt) / 1000;
  game.speedScale = 1 + game.elapsed * 0.055;

  const wallGrowth = delta * 2.55 * gum.wallSpeed * game.speedScale;
  game.leftWall += wallGrowth;
  game.rightWall += wallGrowth;
  game.chip += inputDirection * delta * gum.steerSpeed;
  game.chip = Math.max(0, Math.min(100, game.chip));

  game.cashEarned = game.elapsed * 2.4 * gum.yieldMultiplier * game.rewardMultiplier;
  const wallPressure = Math.min(1, (game.leftWall + game.rightWall) / 94);
  const growthProgress = Math.min(1, wallPressure * gum.bubbleGrowth);
  game.bubbleSize = 140 + (gum.maxBubble - 140) * growthProgress;

  const min = game.leftWall + gum.collisionPadding;
  const max = 100 - game.rightWall - gum.collisionPadding;

  if (game.chip <= min || game.chip >= max || min >= max) {
    popAttempt();
    return;
  }

  render();
  game.animationFrame = requestAnimationFrame(tick);
}

function popAttempt() {
  if (!game.active) return;

  const finalTime = game.elapsed;
  const finalCash = Math.max(1, Math.floor(game.cashEarned));
  const finalBubble = Math.round(game.bubbleSize);
  const isRecord = finalTime > state.bestTime;
  const usedMultiplier = game.rewardMultiplier;
  let streakMessage = "";

  game.active = false;
  cancelAnimationFrame(game.animationFrame);
  state.cash += finalCash;
  state.bestTime = Math.max(state.bestTime, finalTime);
  state.bestBubble = Math.max(state.bestBubble, finalBubble);

  if (usedMultiplier > 1) state.nextRoundMultiplier = 1;

  if (finalTime >= MULTIPLIER_TIERS.at(-1).seconds) {
    state.streakTimes.push(finalTime);
    if (state.streakTimes.length >= STREAK_RUNS_REQUIRED) {
      const earnedMultiplier = multiplierForTime(Math.min(...state.streakTimes));
      const tier = MULTIPLIER_TIERS.find((item) => item.multiplier === earnedMultiplier);
      state.streakTimes = [];
      state.nextRoundMultiplier = earnedMultiplier;
      streakMessage = `${tier.name} streak! Your next turn earns ${payoutPhrase(earnedMultiplier)}.`;
    } else {
      const nextStep = state.streakTimes.length === 2 ? "One more great run to go!" : "Keep it going!";
      streakMessage = `Great run! ${nextStep}`;
    }
  } else {
    if (state.streakTimes.length > 0) {
      streakMessage = "Streak reset. Stay alive longer to start again.";
    } else if (usedMultiplier > 1) {
      streakMessage = `${multiplierName(usedMultiplier)} cash collected. Build another streak for a new boost.`;
    }
    state.streakTimes = [];
  }
  saveState();
  renderShop();

  els.bubble.classList.add("pop");
  els.bubbleZone.classList.add("shake");
  playPop();

  if (isRecord) {
    els.recordBurst.classList.remove("show");
    requestAnimationFrame(() => els.recordBurst.classList.add("show"));
    playTone(860, 0.1, "square", 0.035);
  }

  setTimeout(() => {
    els.bubble.classList.remove("pop");
    els.bubbleZone.classList.remove("shake");
    showSummary(finalTime, finalCash, isRecord, usedMultiplier);
    render();
    if (streakMessage) {
      showToast(streakMessage, multiplierTone(state.nextRoundMultiplier));
    }
  }, 360);
}

function showSummary(time, cash, isRecord, multiplier) {
  els.summaryTitle.textContent = isRecord ? "New record pop" : "Bubble burst";
  els.summaryTime.textContent = formatTime(time);
  els.summaryCashLabel.textContent = multiplier > 1 ? `Earned (${multiplierName(multiplier)} boost)` : "Earned";
  els.summaryCash.textContent = formatMoney(cash);
  els.summaryTotal.textContent = formatMoney(state.cash);
  els.summaryModal.classList.remove("hidden");
}

function hideSummary() {
  els.summaryModal.classList.add("hidden");
}

function openShop() {
  renderShop();
  els.shopModal.classList.remove("hidden");
}

function closeShop() {
  els.shopModal.classList.add("hidden");
}

function setDirection(direction) {
  inputDirection = direction;
  render();
}

function setChipFromPointer(event) {
  if (!game.active) return;
  const rect = els.track.getBoundingClientRect();
  const percent = ((event.clientX - rect.left) / rect.width) * 100;
  game.chip = Math.max(0, Math.min(100, percent));
  render();
}

function showToast(message, tone = "success") {
  clearTimeout(toastTimeout);
  els.toast.textContent = message;
  els.toast.className = `toast show ${tone}`;
  toastTimeout = setTimeout(() => {
    els.toast.classList.remove("show");
  }, 3200);
}

function playTone(frequency, duration, type = "sine", gainValue = 0.04) {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = gainValue;
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch {
    audioContext = null;
  }
}

function playPop() {
  playTone(130, 0.08, "sawtooth", 0.06);
  setTimeout(() => playTone(72, 0.09, "square", 0.035), 60);
}

els.playButton.addEventListener("click", startAttempt);
els.playAgainButton.addEventListener("click", startAttempt);
els.shopButton.addEventListener("click", openShop);
els.closeShopButton.addEventListener("click", closeShop);
els.shopSearch.addEventListener("input", renderShop);

els.summaryModal.addEventListener("click", (event) => {
  if (event.target === els.summaryModal) hideSummary();
});
els.shopModal.addEventListener("click", (event) => {
  if (event.target === els.shopModal) closeShop();
});

els.leftButton.addEventListener("pointerdown", () => setDirection(-1));
els.rightButton.addEventListener("pointerdown", () => setDirection(1));

els.track.addEventListener("pointerdown", (event) => {
  els.track.setPointerCapture(event.pointerId);
  setChipFromPointer(event);
});
els.track.addEventListener("pointermove", setChipFromPointer);

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
    if (!game.active) startAttempt();
  }

  if (event.key === "Escape") {
    closeShop();
    hideSummary();
  }
});

render();
renderInventory();
renderShop();
