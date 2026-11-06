const STORAGE_KEY = "bubble-gum-indulgence-v2";
const AUDIO_STORAGE_KEY = "bubble-gum-indulgence-audio-v1";
const MODE_STORAGE_KEY = "bubble-gum-indulgence-mode-v1";
const INFINITE_STORAGE_KEY = "bubble-gum-indulgence-infinite-v1";
const WELCOME_STORAGE_KEY = "bubble-gum-indulgence-welcome-v3";
const STREAK_RUNS_REQUIRED = 3;
const CLICK_BONUS_PER_ACTION = 1;
const MAX_CLICK_BONUS = 100;
const MULTIPLIER_TIERS = [
  { seconds: 22, multiplier: 10, name: "Ultra" },
  { seconds: 16, multiplier: 5, name: "Super" },
  { seconds: 12, multiplier: 2, name: "Boost" },
];
const RUN_CALLOUTS = [
  { seconds: 5, message: "Nice stretch!" },
  { seconds: 10, message: "Bubble breaker!" },
  { seconds: 15, message: "Pressure rising!" },
  { seconds: 20, message: "Bubble legend!" },
  { seconds: 30, message: "Unpoppable!" },
];
const ACHIEVEMENTS = [
  { id: "first-pop", title: "First Pop", detail: "Finish 1 Challenge run", type: "runs", target: 1 },
  { id: "ten-seconds", title: "Bubble Rookie", detail: "Survive 10 seconds", type: "time", target: 10 },
  { id: "twenty-seconds", title: "Pressure Pro", detail: "Survive 20 seconds", type: "time", target: 20 },
  { id: "thirty-seconds", title: "Bubble Legend", detail: "Survive 30 seconds", type: "time", target: 30 },
  { id: "five-gums", title: "Flavor Scout", detail: "Own 5 gums", type: "gums", target: 5 },
  { id: "fifteen-gums", title: "Gum Collector", detail: "Own 15 gums", type: "gums", target: 15 },
  { id: "all-gums", title: "Shelf Complete", detail: "Own all 55 gums", type: "gums", target: 55 },
  { id: "click-frenzy", title: "Click Frenzy", detail: "Use 50 clicks in one run", type: "clicks", target: 50 },
];
const SHOP_SHELVES = {
  early: [1, 4],
  rising: [5, 9],
  expert: [10, 13],
  elite: [14, 18],
};
const FICTIONAL_LEADERBOARD = [
  { name: "BubbleBot_87", time: 42.8, gum: "Gelato Glow" },
  { name: "ChewChamp", time: 34.6, gum: "Churro Charge" },
  { name: "MintyMeteor", time: 27.3, gum: "Mint Orbit" },
  { name: "GummyGhost", time: 21.7, gum: "Marshmallow Melt" },
  { name: "PopPilot", time: 15.4, gum: "Pink Pop Roll" },
  { name: "SugarStatic", time: 9.8, gum: "Starter Slab" },
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
    perk: "Training Chew: your first three runs get slower walls while you learn.",
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
  runs: 0,
  bestClicks: 0,
  achievements: [],
};

const defaultInfiniteState = {
  unlocked: ["starter"],
  activeGumId: "starter",
  pops: 0,
};

const defaultAudioSettings = {
  musicVolume: 0.35,
  gameVolume: 0.7,
};

const MUSIC_NOTES = [659.25, 783.99, 880, 783.99, 698.46, 880, 987.77, 880, 587.33, 698.46, 783.99, 698.46, 523.25, 659.25, 783.99, 987.77];
const MUSIC_BASS = [164.81, 174.61, 146.83, 130.81];

let state = loadState();
let infiniteState = loadInfiniteState();
let audioSettings = loadAudioSettings();
let inputDirection = 1;
let audioContext = null;
let musicGain = null;
let gameGain = null;
let musicTimer = null;
let musicStep = 0;
let selectedDetailGumId = null;
let currentMode = loadMode();
let game = createIdleGame();
let lab = createLabState();
let countdownActive = false;
let countdownValue = 0;
let countdownTimer = null;
let welcomeOpen = !hasSeenWelcome();
let welcomeDismissible = false;

const els = {
  arcade: document.querySelector("#arcade"),
  gameTitle: document.querySelector("#gameTitle"),
  labModeButton: document.querySelector("#labModeButton"),
  challengeModeButton: document.querySelector("#challengeModeButton"),
  labView: document.querySelector("#labView"),
  challengeView: document.querySelector("#challengeView"),
  modeExplainer: document.querySelector("#modeExplainer"),
  modeKicker: document.querySelector("#modeKicker"),
  modeName: document.querySelector("#modeName"),
  modeDescription: document.querySelector("#modeDescription"),
  modeDetails: document.querySelector("#modeDetails"),
  modeEconomy: document.querySelector("#modeEconomy"),
  modeEconomyLabel: document.querySelector("#modeEconomyLabel"),
  modeEconomyValue: document.querySelector("#modeEconomyValue"),
  modeEconomyText: document.querySelector("#modeEconomyText"),
  modeShopButton: document.querySelector("#modeShopButton"),
  welcomeModal: document.querySelector("#welcomeModal"),
  welcomeChallengeButton: document.querySelector("#welcomeChallengeButton"),
  welcomeInfiniteButton: document.querySelector("#welcomeInfiniteButton"),
  achievementsButton: document.querySelector("#achievementsButton"),
  leaderboardButton: document.querySelector("#leaderboardButton"),
  instructionsButton: document.querySelector("#instructionsButton"),
  closeWelcomeButton: document.querySelector("#closeWelcomeButton"),
  labStage: document.querySelector("#labStage"),
  labBubble: document.querySelector("#labBubble"),
  labBubbleText: document.querySelector("#labBubbleText"),
  labGumLabel: document.querySelector("#labGumLabel"),
  labCombo: document.querySelector("#labCombo"),
  labSize: document.querySelector("#labSize"),
  labReward: document.querySelector("#labReward"),
  inflateButton: document.querySelector("#inflateButton"),
  popButton: document.querySelector("#popButton"),
  labMessage: document.querySelector("#labMessage"),
  labFlash: document.querySelector("#labFlash"),
  popParticles: document.querySelector("#popParticles"),
  cash: document.querySelector("#cash"),
  cashPill: document.querySelector("#cashPill"),
  bestTime: document.querySelector("#bestTime"),
  secondaryStatLabel: document.querySelector("#secondaryStatLabel"),
  inventoryButton: document.querySelector("#inventoryButton"),
  settingsButton: document.querySelector("#settingsButton"),
  bubbleZone: document.querySelector("#bubbleZone"),
  gameCard: document.querySelector("#gameCard"),
  bubble: document.querySelector("#bubble"),
  bubbleText: document.querySelector("#bubbleText"),
  gumLabel: document.querySelector("#gumLabel"),
  timer: document.querySelector("#timer"),
  roundCashLabel: document.querySelector("#roundCashLabel"),
  roundCash: document.querySelector("#roundCash"),
  equippedName: document.querySelector("#equippedName"),
  multiplier: document.querySelector("#multiplier"),
  clickCount: document.querySelector("#clickCount"),
  streakText: document.querySelector("#streakText"),
  streakStatus: document.querySelector("#streakStatus"),
  streakPips: [...document.querySelectorAll(".streak-pip")],
  track: document.querySelector("#track"),
  controlChip: document.querySelector("#controlChip"),
  playButton: document.querySelector("#playButton"),
  runPromise: document.querySelector("#runPromise"),
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
  summaryTotalLabel: document.querySelector("#summaryTotalLabel"),
  summaryTotal: document.querySelector("#summaryTotal"),
  playAgainButton: document.querySelector("#playAgainButton"),
  inventoryModal: document.querySelector("#inventoryModal"),
  closeInventoryButton: document.querySelector("#closeInventoryButton"),
  shopTitle: document.querySelector("#shopTitle"),
  shopPanel: document.querySelector("#shopPanel"),
  shopBalance: document.querySelector("#shopBalance"),
  shopList: document.querySelector("#shopList"),
  shopSearch: document.querySelector("#shopSearch"),
  shopTierFilter: document.querySelector("#shopTierFilter"),
  gumDetailModal: document.querySelector("#gumDetailModal"),
  closeGumDetailButton: document.querySelector("#closeGumDetailButton"),
  detailPackArt: document.querySelector("#detailPackArt"),
  detailTier: document.querySelector("#detailTier"),
  detailName: document.querySelector("#detailName"),
  detailFlavor: document.querySelector("#detailFlavor"),
  detailProof: document.querySelector("#detailProof"),
  detailPitch: document.querySelector("#detailPitch"),
  detailStats: document.querySelector("#detailStats"),
  detailComparisons: document.querySelector("#detailComparisons"),
  detailAction: document.querySelector("#detailAction"),
  settingsModal: document.querySelector("#settingsModal"),
  closeSettingsButton: document.querySelector("#closeSettingsButton"),
  musicVolume: document.querySelector("#musicVolume"),
  musicVolumeValue: document.querySelector("#musicVolumeValue"),
  gameVolume: document.querySelector("#gameVolume"),
  gameVolumeValue: document.querySelector("#gameVolumeValue"),
  restartButton: document.querySelector("#restartButton"),
  resetConfirmModal: document.querySelector("#resetConfirmModal"),
  cancelResetButton: document.querySelector("#cancelResetButton"),
  confirmResetButton: document.querySelector("#confirmResetButton"),
  achievementsModal: document.querySelector("#achievementsModal"),
  closeAchievementsButton: document.querySelector("#closeAchievementsButton"),
  achievementCount: document.querySelector("#achievementCount"),
  achievementList: document.querySelector("#achievementList"),
  leaderboardModal: document.querySelector("#leaderboardModal"),
  closeLeaderboardButton: document.querySelector("#closeLeaderboardButton"),
  leaderboardList: document.querySelector("#leaderboardList"),
  splatterLayer: document.querySelector("#splatterLayer"),
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
    clicks: 0,
    clickBonusPercent: 0,
    lastInflationSoundAt: 0,
    calloutsShown: [],
    recordAlerted: false,
  };
}

function createLabState() {
  return {
    active: false,
    popping: false,
    animationFrame: null,
    lastFrameAt: 0,
    size: 140,
    combo: 0,
    lastPopAt: 0,
    lastReward: 0,
    pointerStartX: 0,
    pointerStartY: 0,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.unlocked)) return createDefaultState();

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
      runs: Number.isInteger(saved.runs) ? Math.max(0, saved.runs) : 0,
      bestClicks: Number.isInteger(saved.bestClicks) ? Math.max(0, saved.bestClicks) : 0,
      achievements: Array.isArray(saved.achievements)
        ? saved.achievements.filter((id) => ACHIEVEMENTS.some((achievement) => achievement.id === id))
        : [],
    };
  } catch {
    return createDefaultState();
  }
}

function createDefaultState() {
  return {
    ...defaultState,
    unlocked: [...defaultState.unlocked],
    streakTimes: [],
    achievements: [],
  };
}

function createDefaultInfiniteState() {
  return {
    ...defaultInfiniteState,
    unlocked: [...defaultInfiniteState.unlocked],
  };
}

function loadInfiniteState() {
  try {
    const saved = JSON.parse(localStorage.getItem(INFINITE_STORAGE_KEY));
    if (!saved || !Array.isArray(saved.unlocked)) return createDefaultInfiniteState();
    const unlocked = [...new Set(["starter", ...saved.unlocked])].filter((id) =>
      gums.some((gum) => gum.id === id)
    );
    return {
      unlocked,
      activeGumId: unlocked.includes(saved.activeGumId) ? saved.activeGumId : "starter",
      pops: Number.isInteger(saved.pops) ? Math.max(0, saved.pops) : 0,
    };
  } catch {
    return createDefaultInfiniteState();
  }
}

function loadAudioSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(AUDIO_STORAGE_KEY));
    return {
      musicVolume: Number.isFinite(saved?.musicVolume)
        ? Math.max(0, Math.min(1, saved.musicVolume))
        : defaultAudioSettings.musicVolume,
      gameVolume: Number.isFinite(saved?.gameVolume)
        ? Math.max(0, Math.min(1, saved.gameVolume))
        : defaultAudioSettings.gameVolume,
    };
  } catch {
    return { ...defaultAudioSettings };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveAudioSettings() {
  localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(audioSettings));
}

function saveInfiniteState() {
  localStorage.setItem(INFINITE_STORAGE_KEY, JSON.stringify(infiniteState));
}

function loadMode() {
  return localStorage.getItem(MODE_STORAGE_KEY) === "infinite" ? "infinite" : "challenge";
}

function saveMode() {
  localStorage.setItem(MODE_STORAGE_KEY, currentMode);
}

function hasSeenWelcome() {
  try {
    return localStorage.getItem(WELCOME_STORAGE_KEY) === "seen";
  } catch {
    return false;
  }
}

function finishWelcome(mode) {
  currentMode = mode;
  saveMode();
  try {
    localStorage.setItem(WELCOME_STORAGE_KEY, "seen");
  } catch {}
  welcomeOpen = false;
  welcomeDismissible = false;
  els.closeWelcomeButton.classList.add("hidden");
  els.welcomeModal.classList.add("hidden");
  render();
  renderInventory();
  renderShop();
}

function openInstructions() {
  if (game.active || countdownActive) return;
  welcomeOpen = true;
  welcomeDismissible = true;
  els.closeWelcomeButton.classList.remove("hidden");
  els.welcomeModal.classList.remove("hidden");
}

function closeInstructions() {
  if (!welcomeDismissible) return;
  welcomeOpen = false;
  welcomeDismissible = false;
  els.closeWelcomeButton.classList.add("hidden");
  els.welcomeModal.classList.add("hidden");
}

function activeGum() {
  const activeId = currentMode === "infinite" ? infiniteState.activeGumId : state.activeGumId;
  return gums.find((gum) => gum.id === activeId) || gums[0];
}

function activeCollection() {
  return currentMode === "infinite" ? infiniteState : state;
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

function visualBubbleSize(rawSize, gum) {
  const minimumSize = 140;
  const viewportLimit = Math.min(420, window.innerWidth * 0.62, window.innerHeight * 0.42);
  const maximumSize = Math.max(190, viewportLimit);
  const growthRange = Math.max(1, gum.maxBubble - minimumSize);
  const growthProgress = Math.max(0, Math.min(1, (rawSize - minimumSize) / growthRange));
  return minimumSize + (maximumSize - minimumSize) * growthProgress;
}

function render() {
  const gum = activeGum();
  const infiniteMode = currentMode === "infinite";
  const rawBubbleSize = game.active
    ? game.bubbleSize
    : infiniteMode
      ? 150
      : Math.max(140, Math.min(state.bestBubble || 150, gum.maxBubble));
  const bubbleSize = visualBubbleSize(rawBubbleSize, gum);
  const pressureProgress = game.active ? Math.min(1, game.elapsed / 30) : 0;
  const screenShake = game.active ? Math.min(3.5, Math.max(0, (game.elapsed - 5) * 0.14)) : 0;

  els.cash.textContent = infiniteMode ? "∞" : formatMoney(state.cash);
  els.secondaryStatLabel.textContent = infiniteMode ? "Freedom" : "Best";
  els.bestTime.textContent = infiniteMode ? "Unlimited" : formatTime(state.bestTime);
  els.timer.textContent = formatTime(game.elapsed);
  els.roundCashLabel.textContent = infiniteMode ? "Simulated cash" : "Round cash";
  els.roundCash.textContent = formatMoney(game.cashEarned);
  els.equippedName.textContent = gum.name;
  const visibleMultiplier = infiniteMode ? 1 : game.active ? game.rewardMultiplier : state.nextRoundMultiplier;
  els.multiplier.textContent = `${visibleMultiplier}x`;
  els.clickCount.textContent = `${game.clicks} · +${game.clickBonusPercent}%`;
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
  els.bubbleText.textContent = countdownActive ? countdownValue : game.active ? formatTime(game.elapsed) : "Ready";
  els.gumLabel.textContent = gum.name;
  els.arcade.style.setProperty("--gum-color", gum.color);
  els.arcade.style.setProperty("--gum-ink", readableTextColor(gum.color));
  els.bubble.style.setProperty("--bubble-size", `${bubbleSize}px`);
  els.bubble.style.setProperty("--gum-strength", `${88 - pressureProgress * 52}%`);
  els.bubble.style.setProperty("--gum-shadow-strength", `${76 - pressureProgress * 42}%`);
  els.bubble.style.setProperty("--wobble-angle", `${0.5 + pressureProgress * 2.5}deg`);
  els.bubble.style.setProperty("--wobble-speed", `${Math.max(0.38, 1.05 - pressureProgress * 0.62)}s`);
  els.bubble.classList.toggle("pressure-wobble", game.active && game.elapsed > 3);
  els.gameCard.style.setProperty("--screen-shake", `${screenShake}px`);
  els.gameCard.style.setProperty("--screen-shake-negative", `${-screenShake}px`);
  els.gameCard.classList.toggle("run-shake", game.active && game.elapsed > 5);
  els.track.style.setProperty("--left-wall", `${game.leftWall}%`);
  els.track.style.setProperty("--right-wall", `${game.rightWall}%`);
  els.track.style.setProperty("--chip-x", `${game.chip}%`);
  els.leftButton.classList.toggle("active", inputDirection < 0);
  els.rightButton.classList.toggle("active", inputDirection > 0);
  els.playButton.textContent = countdownActive
    ? `Starting in ${countdownValue}`
    : game.active
      ? "Inflating..."
      : infiniteMode
        ? "Start infinite run"
        : "Start challenge";
  els.runPromise.textContent = infiniteMode
    ? "Try every flavor, chase a bigger bubble, and keep your infinite wallet."
    : "Pop bigger, earn faster, unlock your next flavor.";
  els.playButton.disabled = game.active || countdownActive;
  els.settingsButton.disabled = game.active || countdownActive;
  els.inventoryButton.disabled = game.active || countdownActive;
  els.achievementsButton.disabled = game.active || countdownActive;
  els.leaderboardButton.disabled = game.active || countdownActive;
  els.instructionsButton.disabled = game.active || countdownActive;
  els.modeShopButton.disabled = game.active || countdownActive;
  els.labModeButton.disabled = game.active || countdownActive;
  els.challengeModeButton.disabled = game.active || countdownActive;
  els.labModeButton.classList.toggle("active", infiniteMode);
  els.challengeModeButton.classList.toggle("active", currentMode === "challenge");
  els.labModeButton.setAttribute("aria-pressed", infiniteMode);
  els.challengeModeButton.setAttribute("aria-pressed", currentMode === "challenge");
  els.labView.classList.add("hidden");
  els.challengeView.classList.remove("hidden");
  els.streakStatus.classList.toggle("hidden", infiniteMode);
  els.arcade.classList.toggle("infinite-mode", infiniteMode);
  els.cashPill.classList.toggle("infinite-power", infiniteMode);
  els.inventoryButton.textContent = "Inventory";
  els.gameTitle.textContent = infiniteMode ? "Infinite Bubble Mode" : "Bubble Gum Challenge";
  els.shopTitle.textContent = infiniteMode ? "Unlimited Gum Shop" : "Gum Shop";
  els.shopBalance.textContent = infiniteMode ? "Wallet ∞" : `Wallet ${formatMoney(state.cash)}`;
  renderModeExplanation(infiniteMode);

  renderEquipped(gum);
  renderLab();
}

function renderModeExplanation(infiniteMode) {
  els.modeExplainer.classList.toggle("infinite", infiniteMode);
  els.modeEconomy.classList.toggle("infinite", infiniteMode);

  if (infiniteMode) {
    els.modeKicker.textContent = "No limits.";
    els.modeName.textContent = "Infinite Mode";
    els.modeDescription.textContent = "Every gum. Unlimited cash. Real payouts.";
    els.modeDetails.innerHTML = `
      <li>Infinite purchases stay separate from Challenge progress.</li>
    `;
    els.modeEconomyLabel.textContent = "Infinite wallet";
    els.modeEconomyValue.textContent = "∞";
    els.modeEconomyText.textContent = "Your balance never drops.";
    els.modeShopButton.textContent = "Unlimited shop";
  } else {
    els.modeKicker.textContent = "Earn your way up.";
    els.modeName.textContent = "Challenge Mode";
    els.modeDescription.textContent = "Earn cash. Unlock gum. Beat your best.";
    els.modeDetails.innerHTML = `
      <li>Progress, inventory, and records save automatically.</li>
    `;
    els.modeEconomyLabel.textContent = "Progress wallet";
    els.modeEconomyValue.textContent = formatMoney(state.cash);
    els.modeEconomyText.textContent = "Spend what you earn.";
    els.modeShopButton.textContent = "Shop";
  }
}

function renderLab() {
  const gum = activeGum();
  els.labStage.style.setProperty("--lab-color", gum.color);
  els.labStage.style.setProperty("--lab-ink", readableTextColor(gum.color));
  els.labBubble.style.setProperty("--lab-size", `${lab.size}px`);
  els.labBubbleText.textContent = lab.active ? `${Math.round(lab.size)}px` : lab.popping ? "Pop!" : "Hold me";
  els.labGumLabel.textContent = gum.name;
  els.labCombo.textContent = lab.combo;
  els.labSize.textContent = `${Math.round(lab.size)}px`;
  els.labReward.textContent = "∞";
  els.inflateButton.textContent = lab.active ? "Growing..." : "Hold to inflate";
  els.inflateButton.disabled = lab.popping;
  els.popButton.disabled = lab.popping;
  els.labBubble.disabled = lab.popping;
}

function setMode(mode) {
  if (!["infinite", "challenge"].includes(mode) || game.active || countdownActive || welcomeOpen) return;
  if (mode !== "infinite" && lab.active) {
    cancelAnimationFrame(lab.animationFrame);
    lab.active = false;
    lab.size = 140;
    els.labBubble.style.setProperty("--lab-stretch-x", "1");
    els.labBubble.style.setProperty("--lab-stretch-y", "1");
  }
  currentMode = mode;
  saveMode();
  render();
  renderInventory();
  renderShop();
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
  const collection = activeCollection();
  els.inventoryCount.textContent = `${collection.unlocked.length} owned`;
  els.inventory.innerHTML = "";

  collection.unlocked.forEach((id) => {
    const gum = gums.find((item) => item.id === id);
    if (!gum) return;

    const item = document.createElement("button");
    item.type = "button";
    item.className = `inventory-item${gum.id === collection.activeGumId ? " equipped" : ""}`;
    item.innerHTML = `
      <span class="pack-art" style="background:${gum.color}">${gum.shortName}</span>
      <span>
        <strong>${gum.name}</strong>
        <p>${gum.id === collection.activeGumId ? "Equipped" : "Tap to equip"}</p>
      </span>
    `;
    item.addEventListener("click", () => equipGum(gum.id));
    els.inventory.append(item);
  });
}

function renderShop() {
  els.shopList.innerHTML = "";
  const searchTerm = els.shopSearch.value.trim().toLowerCase();
  const selectedShelf = els.shopTierFilter.value;
  const shelfRange = SHOP_SHELVES[selectedShelf];
  const collection = activeCollection();
  const infiniteMode = currentMode === "infinite";
  const visibleGums = gums.filter((gum) => {
    const matchesSearch = `${gum.name} ${gum.flavor} ${gum.perk}`.toLowerCase().includes(searchTerm);
    const matchesShelf = !shelfRange || (gum.tier >= shelfRange[0] && gum.tier <= shelfRange[1]);
    return matchesSearch && matchesShelf;
  });

  visibleGums.forEach((gum) => {
    const owned = collection.unlocked.includes(gum.id);
    const canBuy = infiniteMode || state.cash >= gum.price;
    const card = document.createElement("article");
    card.className = "shop-item";
    card.innerHTML = `
      <div class="pack-art" style="background:${gum.color}">${gum.shortName}</div>
      <div>
        <h3>${gum.name}</h3>
        <p class="flavor-copy">${gum.flavor}</p>
        <p class="perk-copy">${gum.perk}</p>
        <div class="shop-stats">
          <span>${formatMoney(gum.price)}</span>
          <span>${gum.wallSpeed.toFixed(2)}x walls</span>
          <span>${gum.yieldMultiplier.toFixed(2)}x yield</span>
          <span>${gum.maxBubble}px cap</span>
        </div>
        <div class="shop-actions">
          <button class="detail-action" type="button">Details</button>
          <button class="gum-action${owned ? " secondary" : ""}" type="button" ${!owned && !canBuy ? "disabled" : ""}>
            ${owned ? (gum.id === collection.activeGumId ? "Equipped" : "Equip") : "Buy"}
          </button>
        </div>
      </div>
    `;

    card.addEventListener("click", (event) => {
      if (!event.target.closest("button")) openGumDetail(gum.id);
    });
    card.querySelector(".detail-action").addEventListener("click", () => openGumDetail(gum.id));
    card.querySelector(".gum-action").addEventListener("click", () => {
      if (owned) {
        equipGum(gum.id);
      } else {
        buyGum(gum.id);
      }
    });

    els.shopList.append(card);
  });

  if (visibleGums.length === 0) {
    const empty = document.createElement("p");
    empty.className = "shop-empty";
    empty.textContent = "No gum on this shelf matches that search.";
    els.shopList.append(empty);
  }
}

function rankPercent(gum, score, higherIsBetter = true, pool = gums) {
  const ranked = [...pool].sort((first, second) => {
    const difference = score(first) - score(second);
    return higherIsBetter ? -difference : difference;
  });
  const rank = ranked.findIndex((item) => item.id === gum.id) + 1;
  return Math.max(1, Math.ceil((rank / ranked.length) * 100));
}

function performanceScore(gum) {
  return (
    1.4 / gum.wallSpeed +
    gum.yieldMultiplier * 0.72 +
    gum.maxBubble / 310 +
    gum.steerSpeed / 72 +
    0.85 / gum.collisionPadding +
    gum.bubbleGrowth
  );
}

function valueScore(gum) {
  return performanceScore(gum) / Math.sqrt(Math.max(gum.price, 35));
}

function percentDifference(value, baseline) {
  return Math.round(Math.abs(value / baseline - 1) * 100);
}

function gumComparisons(gum) {
  const starter = gums[0];
  const wallDifference = percentDifference(gum.wallSpeed, starter.wallSpeed);
  const yieldDifference = percentDifference(gum.yieldMultiplier, starter.yieldMultiplier);
  const capDifference = percentDifference(gum.maxBubble, starter.maxBubble);
  const steeringDifference = percentDifference(gum.steerSpeed, starter.steerSpeed);
  const edgeDifference = percentDifference(gum.collisionPadding, starter.collisionPadding);
  const growthDifference = percentDifference(gum.bubbleGrowth, starter.bubbleGrowth);

  return [
    gum.wallSpeed < starter.wallSpeed
      ? `Walls close ${wallDifference}% slower than Starter Slab.`
      : gum.wallSpeed > starter.wallSpeed
        ? `Walls close ${wallDifference}% faster than Starter Slab, raising the risk.`
        : "Wall pressure matches Starter Slab.",
    gum.yieldMultiplier > starter.yieldMultiplier
      ? `Earns ${yieldDifference}% more cash per second than Starter Slab.`
      : "Cash earnings match Starter Slab.",
    gum.maxBubble > starter.maxBubble
      ? `Bubble capacity is ${capDifference}% larger than Starter Slab.`
      : "Bubble capacity matches Starter Slab.",
    gum.steerSpeed > starter.steerSpeed
      ? `Steering is ${steeringDifference}% faster than Starter Slab.`
      : gum.steerSpeed < starter.steerSpeed
        ? `Steering is ${steeringDifference}% slower for more deliberate control.`
        : "Steering speed matches Starter Slab.",
    gum.collisionPadding < starter.collisionPadding
      ? `Edge forgiveness improves by ${edgeDifference}% over Starter Slab.`
      : gum.collisionPadding > starter.collisionPadding
        ? `The collision margin is ${edgeDifference}% stricter than Starter Slab.`
        : "Edge forgiveness matches Starter Slab.",
    gum.bubbleGrowth > starter.bubbleGrowth
      ? `Bubble growth is ${growthDifference}% faster than Starter Slab.`
      : gum.bubbleGrowth < starter.bubbleGrowth
        ? `Bubble growth is ${growthDifference}% slower, favoring longer runs.`
        : "Bubble growth matches Starter Slab.",
  ];
}

function gumPositioning(gum) {
  const statRanks = [
    { label: "wall control", percent: rankPercent(gum, (item) => 1 / item.wallSpeed), benefit: "long survival runs" },
    { label: "cash yield", percent: rankPercent(gum, (item) => item.yieldMultiplier), benefit: "earning cash quickly" },
    { label: "bubble capacity", percent: rankPercent(gum, (item) => item.maxBubble), benefit: "building enormous bubbles" },
    { label: "steering speed", percent: rankPercent(gum, (item) => item.steerSpeed), benefit: "fast reaction saves" },
    { label: "edge forgiveness", percent: rankPercent(gum, (item) => 1 / item.collisionPadding), benefit: "surviving close calls" },
    { label: "growth speed", percent: rankPercent(gum, (item) => item.bubbleGrowth), benefit: "growing bubbles quickly" },
  ].sort((first, second) => first.percent - second.percent);

  const strongest = statRanks[0];
  const pricePercent = rankPercent(gum, (item) => item.price);
  const purchasableGums = gums.filter((item) => item.price > 0);
  const valuePercent = gum.price > 0
    ? rankPercent(gum, valueScore, true, purchasableGums)
    : 1;

  let proof;
  if (gum.price === 0) {
    proof = "The free benchmark every other gum is measured against.";
  } else if (pricePercent <= 10) {
    proof = `Collector rarity: only ${pricePercent}% of gums are priced this high.`;
  } else if (valuePercent <= 15) {
    proof = `Best-value territory: top ${valuePercent}% for performance per dollar.`;
  } else {
    proof = `Standout strength: top ${strongest.percent}% of all gums for ${strongest.label}.`;
  }

  return {
    proof,
    pitch: `${gum.name} is a strong pick for ${strongest.benefit}. ${gum.perk}`,
  };
}

function renderGumDetail() {
  const gum = gums.find((item) => item.id === selectedDetailGumId);
  if (!gum) return;

  const collection = activeCollection();
  const infiniteMode = currentMode === "infinite";
  const owned = collection.unlocked.includes(gum.id);
  const canBuy = infiniteMode || state.cash >= gum.price;
  const positioning = gumPositioning(gum);
  const comparisons = gumComparisons(gum);

  els.gumDetailModal.style.setProperty("--detail-color", gum.color);
  els.detailPackArt.style.background = gum.color;
  els.detailPackArt.textContent = gum.shortName;
  els.detailTier.textContent = `Tier ${gum.tier}`;
  els.detailName.textContent = gum.name;
  els.detailFlavor.textContent = gum.flavor;
  els.detailProof.textContent = positioning.proof;
  els.detailPitch.textContent = positioning.pitch;
  els.detailStats.innerHTML = `
    <div><span>Price</span><strong>${formatMoney(gum.price)}</strong></div>
    <div><span>Wall speed</span><strong>${gum.wallSpeed.toFixed(2)}x</strong></div>
    <div><span>Cash yield</span><strong>${gum.yieldMultiplier.toFixed(2)}x</strong></div>
    <div><span>Bubble cap</span><strong>${gum.maxBubble}px</strong></div>
    <div><span>Steering</span><strong>${gum.steerSpeed.toFixed(0)}</strong></div>
    <div><span>Growth</span><strong>${gum.bubbleGrowth.toFixed(2)}x</strong></div>
  `;
  els.detailComparisons.innerHTML = comparisons.map((comparison) => `<li>${comparison}</li>`).join("");
  els.detailAction.textContent = owned
    ? gum.id === collection.activeGumId ? "Equipped" : "Equip this gum"
    : canBuy
      ? infiniteMode ? `Buy for ${formatMoney(gum.price)} - wallet stays ∞` : `Buy for ${formatMoney(gum.price)}`
      : `Need ${formatMoney(gum.price - state.cash)} more`;
  els.detailAction.disabled = (owned && gum.id === collection.activeGumId) || (!owned && !canBuy);
  els.detailAction.classList.toggle("secondary", owned);
}

function openGumDetail(id) {
  selectedDetailGumId = id;
  renderGumDetail();
  els.gumDetailModal.classList.remove("hidden");
}

function closeGumDetail() {
  els.gumDetailModal.classList.add("hidden");
}

function handleDetailAction() {
  const gum = gums.find((item) => item.id === selectedDetailGumId);
  if (!gum) return;
  if (activeCollection().unlocked.includes(gum.id)) {
    equipGum(gum.id);
  } else {
    buyGum(gum.id);
  }
  renderGumDetail();
}

function equipGum(id) {
  const collection = activeCollection();
  if (!collection.unlocked.includes(id)) return;
  collection.activeGumId = id;
  if (currentMode === "infinite") saveInfiniteState();
  else saveState();
  render();
  renderInventory();
  renderShop();
}

function buyGum(id) {
  const gum = gums.find((item) => item.id === id);
  const collection = activeCollection();
  const infiniteMode = currentMode === "infinite";
  let newAchievements = [];
  if (!gum || collection.unlocked.includes(id) || (!infiniteMode && state.cash < gum.price)) return;

  if (infiniteMode) {
    infiniteState.unlocked.push(id);
    infiniteState.activeGumId = id;
    saveInfiniteState();
  } else {
    state.cash -= gum.price;
    state.unlocked.push(id);
    state.activeGumId = id;
    newAchievements = unlockAchievements();
    saveState();
  }
  playTone(680, 0.09, "triangle", 0.05);
  render();
  renderInventory();
  renderShop();
  if (newAchievements.length > 0) {
    showToast(`Achievement unlocked: ${newAchievements[0].title}`, "bonus");
  }
}

function beginLabInflation(event) {
  if (currentMode !== "infinite" || lab.active || lab.popping) return;
  event?.preventDefault();
  if (event?.pointerId !== undefined && event.currentTarget?.setPointerCapture) {
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  startMusic();
  lab.active = true;
  lab.lastFrameAt = performance.now();
  lab.pointerStartX = event?.clientX || 0;
  lab.pointerStartY = event?.clientY || 0;
  els.labMessage.textContent = "Keep holding for a bigger bubble. Release to pop.";
  playTone(520, 0.06, "sine", 0.025);
  renderLab();
  lab.animationFrame = requestAnimationFrame(tickLab);
}

function tickLab(now) {
  if (!lab.active) return;
  const gum = activeGum();
  const delta = Math.min((now - lab.lastFrameAt) / 1000, 0.05);
  lab.lastFrameAt = now;
  const growthPerSecond = 48 * gum.bubbleGrowth * (0.92 + gum.yieldMultiplier * 0.025);
  lab.size = Math.min(gum.maxBubble, lab.size + delta * growthPerSecond);

  const wobble = Math.sin(now / 115) * Math.min(4, 1 + (lab.size - 140) / 90);
  els.labBubble.style.setProperty("--lab-wobble", `${wobble}deg`);
  renderLab();
  lab.animationFrame = requestAnimationFrame(tickLab);
}

function stretchLabBubble(event) {
  if (!lab.active || !event.clientX) return;
  const horizontal = Math.max(-70, Math.min(70, event.clientX - lab.pointerStartX));
  const vertical = Math.max(-45, Math.min(45, event.clientY - lab.pointerStartY));
  const stretchX = 1 + Math.abs(horizontal) / 220;
  const stretchY = Math.max(0.78, 1 - Math.abs(horizontal) / 320 + Math.abs(vertical) / 700);
  els.labBubble.style.setProperty("--lab-stretch-x", stretchX.toFixed(3));
  els.labBubble.style.setProperty("--lab-stretch-y", stretchY.toFixed(3));
}

function releaseLabBubble() {
  if (!lab.active) return;
  popLabBubble();
}

function createPopParticles(color, amount) {
  els.popParticles.innerHTML = "";
  els.splatterLayer.innerHTML = "";
  els.splatterLayer.classList.remove("show");
  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / amount + Math.random() * 0.25;
    const distance = 80 + Math.random() * 130;
    particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--particle-color", color);
    particle.style.setProperty("--particle-delay", `${Math.random() * 70}ms`);
    els.popParticles.append(particle);
  }
}

function popLabBubble() {
  if (currentMode !== "infinite" || lab.popping) return;
  const gum = activeGum();
  if (lab.animationFrame) cancelAnimationFrame(lab.animationFrame);
  lab.active = false;
  lab.popping = true;

  const now = performance.now();
  lab.combo = now - lab.lastPopAt < 4200 ? lab.combo + 1 : 1;
  lab.lastPopAt = now;
  const comboPopAt = lab.lastPopAt;
  infiniteState.pops += 1;

  const sizeProgress = Math.max(0, Math.min(1, (lab.size - 140) / Math.max(1, gum.maxBubble - 140)));
  const perfectPop = sizeProgress >= 0.62 && sizeProgress <= 0.84;
  const sugarRush = infiniteState.pops % 8 === 0;
  saveInfiniteState();

  els.labBubble.style.setProperty("--lab-stretch-x", "1");
  els.labBubble.style.setProperty("--lab-stretch-y", "1");
  els.labBubble.classList.add("lab-pop");
  createPopParticles(gum.color, sugarRush ? 26 : perfectPop ? 20 : 14);
  playPop();
  navigator.vibrate?.(sugarRush ? [35, 25, 45] : 28);

  if (sugarRush) {
    els.labMessage.textContent = "Sugar rush! Maximum sparkle, unlimited wallet, and a fresh bubble incoming.";
    els.labFlash.classList.remove("show");
    requestAnimationFrame(() => els.labFlash.classList.add("show"));
    playTone(1046.5, 0.16, "triangle", 0.05);
  } else if (perfectPop) {
    els.labMessage.textContent = `Perfect pop! Your ${lab.combo}-pop combo keeps climbing.`;
    playTone(880, 0.12, "triangle", 0.045);
  } else if (sizeProgress > 0.9) {
    els.labMessage.textContent = "Mega pop! That bubble nearly reached this gum's full capacity.";
  } else {
    els.labMessage.textContent = `${lab.combo}-pop combo. No cost, no limits, and your next bubble is ready.`;
  }

  render();
  setTimeout(() => {
    lab.size = 140;
    lab.popping = false;
    els.labBubble.classList.remove("lab-pop");
    render();
  }, 320);
  setTimeout(() => {
    if (lab.lastPopAt === comboPopAt && performance.now() - lab.lastPopAt >= 4200) {
      lab.combo = 0;
      renderLab();
    }
  }, 4250);
}

function startAttempt(countdownSeconds = 3) {
  if (game.active || countdownActive || welcomeOpen) return;

  countdownActive = true;
  countdownValue = countdownSeconds;
  game = createIdleGame();
  inputDirection = 1;
  hideSummary();
  startMusic();
  playTone(520, 0.08, "sine", 0.04);
  render();

  const countDown = () => {
    countdownValue -= 1;
    if (countdownValue > 0) {
      playTone(520, 0.08, "sine", 0.04);
      render();
      countdownTimer = setTimeout(countDown, 1000);
      return;
    }

    countdownActive = false;
    countdownTimer = null;
    beginAttempt();
  };

  countdownTimer = setTimeout(countDown, 1000);
}

function beginAttempt() {
  const now = performance.now();
  const rewardMultiplier = currentMode === "infinite" ? 1 : state.nextRoundMultiplier;
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
  showToast("GO! Keep the slider inside the walls.", "bonus");
  playTone(760, 0.12, "triangle", 0.05);
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

  const firstRunAssist = currentMode === "challenge" && gum.id === "starter" && state.runs < 3 ? 0.62 : 1;
  const wallGrowth = delta * 2.55 * gum.wallSpeed * game.speedScale * firstRunAssist;
  game.leftWall += wallGrowth;
  game.rightWall += wallGrowth;
  game.chip += inputDirection * delta * gum.steerSpeed;
  game.chip = Math.max(0, Math.min(100, game.chip));

  const clickBonusMultiplier = 1 + game.clickBonusPercent / 100;
  game.cashEarned = game.elapsed * 2.4 * gum.yieldMultiplier * game.rewardMultiplier * clickBonusMultiplier;
  const wallPressure = Math.min(1, (game.leftWall + game.rightWall) / 94);
  const growthProgress = Math.min(1, wallPressure * gum.bubbleGrowth);
  game.bubbleSize = 140 + (gum.maxBubble - 140) * growthProgress;

  const soundInterval = Math.max(0.34, 0.88 - growthProgress * 0.42);
  if (game.elapsed - game.lastInflationSoundAt >= soundInterval) {
    game.lastInflationSoundAt = game.elapsed;
    playInflationSound(growthProgress, Math.floor(game.elapsed / soundInterval) % 3 === 2);
  }

  const nextCallout = RUN_CALLOUTS.find(
    (callout) => game.elapsed >= callout.seconds && !game.calloutsShown.includes(callout.seconds)
  );
  if (nextCallout) {
    game.calloutsShown.push(nextCallout.seconds);
    showToast(`${nextCallout.seconds}s · ${nextCallout.message}`, "bonus");
    playTone(680 + nextCallout.seconds * 8, 0.12, "triangle", 0.04);
  }

  if (currentMode === "challenge" && state.bestTime > 0 && game.elapsed > state.bestTime && !game.recordAlerted) {
    game.recordAlerted = true;
    els.recordBurst.textContent = "New high score";
    els.recordBurst.classList.remove("show");
    requestAnimationFrame(() => els.recordBurst.classList.add("show"));
    showToast("New high score — keep going!", "bonus");
  }

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

  const infiniteMode = currentMode === "infinite";
  const finalTime = game.elapsed;
  const finalCash = Math.max(1, Math.floor(game.cashEarned));
  const finalBubble = Math.round(game.bubbleSize);
  const isRecord = finalTime > state.bestTime;
  const usedMultiplier = game.rewardMultiplier;
  let streakMessage = "";
  let newAchievements = [];

  game.active = false;
  cancelAnimationFrame(game.animationFrame);

  els.bubble.classList.add("pop");
  els.bubbleZone.classList.add("shake");
  createSplatters(activeGum().color);
  playPop();

  if (infiniteMode) {
    setTimeout(() => {
      els.bubble.classList.remove("pop");
      els.bubbleZone.classList.remove("shake");
      showSummary(finalTime, finalCash, false, 1, true, game.clickBonusPercent);
      render();
    }, 360);
    return;
  }

  state.cash += finalCash;
  state.runs += 1;
  state.bestClicks = Math.max(state.bestClicks, game.clicks);
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
  newAchievements = unlockAchievements();
  saveState();
  renderShop();

  if (isRecord) {
    els.recordBurst.classList.remove("show");
    requestAnimationFrame(() => els.recordBurst.classList.add("show"));
    playTone(860, 0.1, "square", 0.035);
  }

  setTimeout(() => {
    els.bubble.classList.remove("pop");
    els.bubbleZone.classList.remove("shake");
    showSummary(finalTime, finalCash, isRecord, usedMultiplier, false, game.clickBonusPercent);
    render();
    if (newAchievements.length > 0) {
      const extra = newAchievements.length > 1 ? ` +${newAchievements.length - 1} more` : "";
      showToast(`Achievement: ${newAchievements[0].title}${extra}`, "bonus");
    } else if (streakMessage) {
      showToast(streakMessage, multiplierTone(state.nextRoundMultiplier));
    }
  }, 360);
}

function showSummary(time, cash, isRecord, multiplier, infiniteMode = false, clickBonusPercent = 0) {
  els.summaryTitle.textContent = infiniteMode ? "Infinite bubble pop" : isRecord ? "New record pop" : "Bubble burst";
  els.summaryTime.textContent = formatTime(time);
  const clickBonusText = clickBonusPercent > 0 ? ` · +${clickBonusPercent}% clicks` : "";
  els.summaryCashLabel.textContent = infiniteMode
    ? `Simulated${clickBonusText}`
    : multiplier > 1
      ? `${multiplierName(multiplier)} earned${clickBonusText}`
      : `Earned${clickBonusText}`;
  els.summaryCash.textContent = formatMoney(cash);
  els.summaryTotalLabel.textContent = infiniteMode ? "Wallet" : "Total";
  els.summaryTotal.textContent = infiniteMode ? "∞" : formatMoney(state.cash);
  els.summaryModal.classList.remove("hidden");
}

function hideSummary() {
  els.summaryModal.classList.add("hidden");
}

function openInventory() {
  renderInventory();
  els.inventoryModal.classList.remove("hidden");
}

function closeInventory() {
  els.inventoryModal.classList.add("hidden");
}

function focusShop() {
  els.shopPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  els.shopSearch.focus({ preventScroll: true });
}

function achievementProgress(achievement) {
  if (achievement.type === "runs") return state.runs;
  if (achievement.type === "time") return Math.floor(state.bestTime);
  if (achievement.type === "gums") return state.unlocked.length;
  if (achievement.type === "clicks") return state.bestClicks;
  return 0;
}

function unlockAchievements() {
  const newlyUnlocked = [];
  ACHIEVEMENTS.forEach((achievement) => {
    if (state.achievements.includes(achievement.id)) return;
    if (achievementProgress(achievement) < achievement.target) return;
    state.achievements.push(achievement.id);
    newlyUnlocked.push(achievement);
  });
  return newlyUnlocked;
}

function renderAchievements() {
  els.achievementCount.textContent = `${state.achievements.length} / ${ACHIEVEMENTS.length} unlocked`;
  els.achievementList.innerHTML = ACHIEVEMENTS.map((achievement) => {
    const unlocked = state.achievements.includes(achievement.id);
    const progress = Math.min(achievement.target, achievementProgress(achievement));
    return `
      <article class="achievement-item${unlocked ? " unlocked" : ""}">
        <span class="achievement-mark">${unlocked ? "✓" : "○"}</span>
        <div>
          <h3>${achievement.title}</h3>
          <p>${achievement.detail}</p>
        </div>
        <strong>${unlocked ? "Done" : `${progress} / ${achievement.target}`}</strong>
      </article>
    `;
  }).join("");
}

function openAchievements() {
  renderAchievements();
  els.achievementsModal.classList.remove("hidden");
}

function closeAchievements() {
  els.achievementsModal.classList.add("hidden");
}

function renderLeaderboard() {
  const player = {
    name: "YOU",
    time: state.bestTime,
    gum: gums.find((gum) => gum.id === state.activeGumId)?.name || "Starter Slab",
    player: true,
  };
  const entries = [...FICTIONAL_LEADERBOARD, player].sort((first, second) => second.time - first.time);
  els.leaderboardList.innerHTML = entries.map((entry, index) => `
    <article class="leaderboard-row${entry.player ? " player" : ""}">
      <strong class="leaderboard-rank">${index + 1}</strong>
      <div>
        <h3>${entry.name}</h3>
        <p>${entry.player && entry.time === 0 ? "Finish a Challenge run to rank" : entry.gum}</p>
      </div>
      <strong>${entry.time > 0 ? formatTime(entry.time) : "—"}</strong>
    </article>
  `).join("");
}

function openLeaderboard() {
  renderLeaderboard();
  els.leaderboardModal.classList.remove("hidden");
}

function closeLeaderboard() {
  els.leaderboardModal.classList.add("hidden");
}

function openSettings() {
  renderAudioSettings();
  els.settingsModal.classList.remove("hidden");
}

function closeSettings() {
  els.settingsModal.classList.add("hidden");
}

function openResetConfirm() {
  els.resetConfirmModal.classList.remove("hidden");
}

function closeResetConfirm() {
  els.resetConfirmModal.classList.add("hidden");
}

function renderAudioSettings() {
  const musicPercent = Math.round(audioSettings.musicVolume * 100);
  const gamePercent = Math.round(audioSettings.gameVolume * 100);
  els.musicVolume.value = musicPercent;
  els.musicVolumeValue.textContent = `${musicPercent}%`;
  els.gameVolume.value = gamePercent;
  els.gameVolumeValue.textContent = `${gamePercent}%`;
}

function updateAudioSetting(type, value) {
  audioSettings[type] = Math.max(0, Math.min(1, Number(value) / 100));
  saveAudioSettings();
  applyAudioLevels();
  renderAudioSettings();
}

function resetProgress() {
  clearTimeout(countdownTimer);
  countdownTimer = null;
  countdownActive = false;
  countdownValue = 0;
  if (game.animationFrame) cancelAnimationFrame(game.animationFrame);
  if (lab.animationFrame) cancelAnimationFrame(lab.animationFrame);
  game = createIdleGame();
  lab = createLabState();
  inputDirection = 1;
  state = createDefaultState();
  infiniteState = createDefaultInfiniteState();
  saveState();
  saveInfiniteState();

  els.bubble.classList.remove("pop");
  els.bubbleZone.classList.remove("shake");
  els.labBubble.classList.remove("lab-pop");
  els.labBubble.style.setProperty("--lab-stretch-x", "1");
  els.labBubble.style.setProperty("--lab-stretch-y", "1");
  els.popParticles.innerHTML = "";
  els.splatterLayer.innerHTML = "";
  els.splatterLayer.classList.remove("show");
  els.labMessage.textContent = "Infinite wallet active. Choose any gum, inflate it, stretch it, and pop without limits.";
  hideSummary();
  closeInventory();
  closeAchievements();
  closeLeaderboard();
  closeGumDetail();
  closeSettings();
  closeResetConfirm();
  render();
  renderInventory();
  renderShop();
  showToast("Progress reset. Your fresh pack is ready.", "bonus");
  playTone(440, 0.1, "triangle", 0.045);
}

function setDirection(direction) {
  if (countdownActive || welcomeOpen) return;
  registerGameClick();
  inputDirection = direction;
  render();
}

function registerGameClick() {
  if (!game.active) return;
  game.clicks += 1;
  game.clickBonusPercent = Math.min(MAX_CLICK_BONUS, game.clicks * CLICK_BONUS_PER_ACTION);
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

function ensureAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      musicGain = audioContext.createGain();
      gameGain = audioContext.createGain();
      musicGain.connect(audioContext.destination);
      gameGain.connect(audioContext.destination);
      applyAudioLevels();
    }

    if (audioContext.state === "suspended") audioContext.resume();
    return true;
  } catch {
    audioContext = null;
    musicGain = null;
    gameGain = null;
    return false;
  }
}

function applyAudioLevels() {
  if (!audioContext || !musicGain || !gameGain) return;
  const now = audioContext.currentTime;
  musicGain.gain.setTargetAtTime(audioSettings.musicVolume, now, 0.025);
  gameGain.gain.setTargetAtTime(audioSettings.gameVolume, now, 0.025);
}

function startMusic() {
  if (!ensureAudio() || musicTimer) return;
  playMusicStep();
  musicTimer = window.setInterval(playMusicStep, 245);
}

function playMusicStep() {
  if (!audioContext || !musicGain) return;
  if (document.hidden || audioContext.state !== "running") {
    musicStep += 1;
    return;
  }
  const now = audioContext.currentTime;
  const note = audioContext.createOscillator();
  const noteEnvelope = audioContext.createGain();

  note.type = musicStep % 4 === 2 ? "sine" : "triangle";
  note.frequency.value = MUSIC_NOTES[musicStep % MUSIC_NOTES.length];
  noteEnvelope.gain.setValueAtTime(0.0001, now);
  noteEnvelope.gain.exponentialRampToValueAtTime(0.085, now + 0.018);
  noteEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  note.connect(noteEnvelope).connect(musicGain);
  note.start(now);
  note.stop(now + 0.21);

  if (musicStep % 4 === 0) {
    const bass = audioContext.createOscillator();
    const bassEnvelope = audioContext.createGain();
    bass.type = "sine";
    bass.frequency.value = MUSIC_BASS[Math.floor(musicStep / 4) % MUSIC_BASS.length];
    bassEnvelope.gain.setValueAtTime(0.0001, now);
    bassEnvelope.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
    bassEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
    bass.connect(bassEnvelope).connect(musicGain);
    bass.start(now);
    bass.stop(now + 0.4);
  }

  musicStep += 1;
}

function playTone(frequency, duration, type = "sine", gainValue = 0.04) {
  if (!ensureAudio()) return;
  try {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(gainValue, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(gameGain);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch {}
}

function playInflationSound(progress, squish = false) {
  if (!ensureAudio()) return;
  try {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    const envelope = audioContext.createGain();
    oscillator.type = squish ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(105 + progress * 80, now);
    oscillator.frequency.exponentialRampToValueAtTime(165 + progress * 130, now + 0.16);
    filter.type = "lowpass";
    filter.frequency.value = 620 + progress * 520;
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(squish ? 0.055 : 0.035, now + 0.025);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
    oscillator.connect(filter).connect(envelope).connect(gameGain);
    oscillator.start(now);
    oscillator.stop(now + 0.2);

    if (squish) {
      setTimeout(() => playTone(82 + progress * 45, 0.1, "sawtooth", 0.025), 65);
    }
  } catch {}
}

function createSplatters(color) {
  els.splatterLayer.innerHTML = "";
  for (let index = 0; index < 16; index += 1) {
    const splat = document.createElement("span");
    const size = 14 + Math.random() * 54;
    splat.style.setProperty("--splat-color", color);
    splat.style.setProperty("--splat-size", `${size}px`);
    splat.style.setProperty("--splat-x", `${12 + Math.random() * 76}vw`);
    splat.style.setProperty("--splat-y", `${8 + Math.random() * 82}vh`);
    splat.style.setProperty("--splat-rotate", `${Math.random() * 180}deg`);
    splat.style.setProperty("--splat-delay", `${Math.random() * 90}ms`);
    els.splatterLayer.append(splat);
  }
  requestAnimationFrame(() => els.splatterLayer.classList.add("show"));
  setTimeout(() => {
    els.splatterLayer.classList.remove("show");
    els.splatterLayer.innerHTML = "";
  }, 1800);
}

function playPop() {
  if (!ensureAudio()) return;
  const now = audioContext.currentTime;
  const sampleCount = Math.floor(audioContext.sampleRate * 0.22);
  const noiseBuffer = audioContext.createBuffer(1, sampleCount, audioContext.sampleRate);
  const samples = noiseBuffer.getChannelData(0);
  for (let index = 0; index < sampleCount; index += 1) {
    samples[index] = (Math.random() * 2 - 1) * (1 - index / sampleCount);
  }

  const noise = audioContext.createBufferSource();
  const noiseFilter = audioContext.createBiquadFilter();
  const noiseEnvelope = audioContext.createGain();
  noise.buffer = noiseBuffer;
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 460;
  noiseEnvelope.gain.setValueAtTime(0.2, now);
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  noise.connect(noiseFilter).connect(noiseEnvelope).connect(gameGain);
  noise.start(now);

  playTone(190, 0.11, "sawtooth", 0.1);
  playTone(330, 0.05, "square", 0.055);
  setTimeout(() => playTone(62, 0.25, "sine", 0.09), 40);
}

els.playButton.addEventListener("click", () => startAttempt(3));
els.playAgainButton.addEventListener("click", () => startAttempt(1));
els.welcomeChallengeButton.addEventListener("click", () => finishWelcome("challenge"));
els.welcomeInfiniteButton.addEventListener("click", () => finishWelcome("infinite"));
els.labModeButton.addEventListener("click", () => setMode("infinite"));
els.challengeModeButton.addEventListener("click", () => setMode("challenge"));
els.labBubble.addEventListener("pointerdown", beginLabInflation);
els.labBubble.addEventListener("pointermove", stretchLabBubble);
els.inflateButton.addEventListener("pointerdown", beginLabInflation);
els.popButton.addEventListener("click", popLabBubble);
window.addEventListener("pointerup", releaseLabBubble);
window.addEventListener("pointercancel", releaseLabBubble);
els.inventoryButton.addEventListener("click", openInventory);
els.achievementsButton.addEventListener("click", openAchievements);
els.leaderboardButton.addEventListener("click", openLeaderboard);
els.instructionsButton.addEventListener("click", openInstructions);
els.closeWelcomeButton.addEventListener("click", closeInstructions);
els.modeShopButton.addEventListener("click", focusShop);
els.settingsButton.addEventListener("click", openSettings);
els.closeInventoryButton.addEventListener("click", closeInventory);
els.closeAchievementsButton.addEventListener("click", closeAchievements);
els.closeLeaderboardButton.addEventListener("click", closeLeaderboard);
els.closeGumDetailButton.addEventListener("click", closeGumDetail);
els.detailAction.addEventListener("click", handleDetailAction);
els.closeSettingsButton.addEventListener("click", closeSettings);
els.shopSearch.addEventListener("input", renderShop);
els.shopTierFilter.addEventListener("change", renderShop);
els.musicVolume.addEventListener("input", (event) => {
  updateAudioSetting("musicVolume", event.target.value);
  if (Number(event.target.value) > 0) startMusic();
});
els.gameVolume.addEventListener("input", (event) => {
  updateAudioSetting("gameVolume", event.target.value);
});
els.gameVolume.addEventListener("change", () => playTone(620, 0.08, "triangle", 0.05));
els.restartButton.addEventListener("click", openResetConfirm);
els.cancelResetButton.addEventListener("click", closeResetConfirm);
els.confirmResetButton.addEventListener("click", resetProgress);

els.summaryModal.addEventListener("click", (event) => {
  if (event.target === els.summaryModal) hideSummary();
});
els.inventoryModal.addEventListener("click", (event) => {
  if (event.target === els.inventoryModal) closeInventory();
});
els.achievementsModal.addEventListener("click", (event) => {
  if (event.target === els.achievementsModal) closeAchievements();
});
els.leaderboardModal.addEventListener("click", (event) => {
  if (event.target === els.leaderboardModal) closeLeaderboard();
});
els.gumDetailModal.addEventListener("click", (event) => {
  if (event.target === els.gumDetailModal) closeGumDetail();
});
els.settingsModal.addEventListener("click", (event) => {
  if (event.target === els.settingsModal) closeSettings();
});
els.resetConfirmModal.addEventListener("click", (event) => {
  if (event.target === els.resetConfirmModal) closeResetConfirm();
});

els.leftButton.addEventListener("pointerdown", () => setDirection(-1));
els.rightButton.addEventListener("pointerdown", () => setDirection(1));

els.track.addEventListener("pointerdown", (event) => {
  els.track.setPointerCapture(event.pointerId);
  registerGameClick();
  setChipFromPointer(event);
});
els.track.addEventListener("pointermove", setChipFromPointer);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    if (!event.repeat) setDirection(-1);
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    event.preventDefault();
    if (!event.repeat) setDirection(1);
  }

  if (event.key === " " && !event.repeat) {
    event.preventDefault();
    if (!game.active && !countdownActive && !welcomeOpen) {
      startAttempt();
    }
  }

  if (event.key === "Escape") {
    closeInstructions();
    closeResetConfirm();
    closeSettings();
    closeGumDetail();
    closeInventory();
    closeAchievements();
    closeLeaderboard();
    hideSummary();
  }
});

document.addEventListener("visibilitychange", () => {
  if (!audioContext) return;
  if (document.hidden) {
    audioContext.suspend();
  } else if (musicTimer) {
    audioContext.resume();
  }
});

window.addEventListener("resize", render);

render();
renderInventory();
renderShop();
renderAudioSettings();
if (welcomeOpen) els.welcomeModal.classList.remove("hidden");
