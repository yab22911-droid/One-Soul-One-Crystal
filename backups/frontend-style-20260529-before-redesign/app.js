const modeButtons = [...document.querySelectorAll(".mode-button")];
const modePanels = [...document.querySelectorAll("[data-panel]")];
const forms = [...document.querySelectorAll("[data-form]")];
const previewTitle = document.querySelector("#previewTitle");
const previewText = document.querySelector("#previewText");
const previewBeads = document.querySelector("#previewBeads");
const recommendationCards = document.querySelector("#recommendationCards");
const resultContext = document.querySelector("#resultContext");
const selectedName = document.querySelector("#selectedName");
const selectedStory = document.querySelector("#selectedStory");
const selectedPrice = document.querySelector("#selectedPrice");
const insightCopy = document.querySelector("#insightCopy");
const wristUpload = document.querySelector("#wristUpload");
const wristPreview = document.querySelector("#wristPreview");
const resultWrist = document.querySelector("#resultWrist");
const buyButton = document.querySelector("#buyButton");
const cartCount = document.querySelector("#cartCount");
const toast = document.querySelector("#toast");
const regenerateLink = document.querySelector("#regenerateLink");

const params = new URLSearchParams(window.location.search);
const initialMode = ["personality", "wrist", "birth"].includes(params.get("mode"))
  ? params.get("mode")
  : "personality";

const palettes = {
  confidence: ["#d9b45c", "#7f4f24", "#f4f0ea", "#284f3d", "#c28b35"],
  love: ["#f2c3cc", "#b76d7c", "#fff7f4", "#8a79ba", "#e7d5d0"],
  focus: ["#5f8faa", "#243b55", "#f4f7f5", "#8a79ba", "#c6a676"],
  protection: ["#151515", "#3b5264", "#8a79ba", "#d9b45c", "#f4f0ea"],
  calm: ["#8fb8c9", "#f3f7f5", "#86a08c", "#8a79ba", "#284f3d"],
  abundance: ["#284f3d", "#88a45b", "#c28b35", "#f2cf65", "#9a6a4f"],
};

const products = {
  personality: [
    {
      name: "Clear Confidence Set",
      price: "$68",
      palette: "confidence",
      tags: ["confidence", "citrine", "daily wear"],
      materials: "Citrine, tiger eye, clear quartz",
      story: "A warm, structured bracelet for steadier confidence and everyday momentum.",
      insight:
        "Selected for confidence and balance goals, with citrine warmth, tiger eye grounding, and clear quartz brightness.",
    },
    {
      name: "Soft Heart Alignment",
      price: "$78",
      palette: "love",
      tags: ["self-worth", "rose quartz", "giftable"],
      materials: "Rose quartz, moonstone, white crystal",
      story: "A gentle pink-white palette for self-worth, open-hearted connection, and softer styling.",
      insight:
        "Chosen for a romantic or healing mood. The palette keeps the jewelry language soft rather than overly mystical.",
    },
    {
      name: "Quiet Focus Stack",
      price: "$72",
      palette: "focus",
      tags: ["focus", "amethyst", "minimal"],
      materials: "Amethyst, blue stone, clear quartz",
      story: "A cool-toned bracelet for deep work, calm decisions, and a composed daily rhythm.",
      insight:
        "Designed around focus and structure, with a restrained color story that works for everyday outfits.",
    },
  ],
  wrist: [
    {
      name: "Everyday Protection Try-on",
      price: "$82",
      palette: "protection",
      tags: ["AI preview", "obsidian", "grounding"],
      materials: "Black obsidian, amethyst, clear quartz",
      story: "A protective dark-lilac bracelet previewed on your wrist for scale and color balance.",
      insight:
        "The darker bead mix creates visible contrast on the wrist while keeping the preview natural and wearable.",
    },
    {
      name: "Calm Aura Wrist Match",
      price: "$74",
      palette: "calm",
      tags: ["light tone", "aquamarine", "soft scale"],
      materials: "Aquamarine, moonstone, white crystal",
      story: "A soft blue and pearl-toned bracelet for a lighter, quieter wrist look.",
      insight:
        "A good option when the wrist photo suggests lighter materials will preserve a more refined daily look.",
    },
    {
      name: "Golden Momentum Fit",
      price: "$88",
      palette: "abundance",
      tags: ["warm tone", "citrine", "visible energy"],
      materials: "Citrine, tiger eye, green aventurine",
      story: "A warmer wrist statement for ambition, movement, and brighter everyday styling.",
      insight:
        "The gold and green mix gives the bracelet more presence without turning it into a heavy statement piece.",
    },
  ],
  birth: [
    {
      name: "Five Elements Balance",
      price: "$96",
      palette: "calm",
      tags: ["balance", "five elements", "daily"],
      materials: "Amethyst, clear quartz, green aventurine",
      story: "A balanced bracelet inspired by the converted birth moment and elemental profile.",
      insight:
        "The reading is positioned as cultural inspiration. The design balances color and material instead of making outcome claims.",
    },
    {
      name: "Wood Fire Growth Bracelet",
      price: "$108",
      palette: "abundance",
      tags: ["growth", "citrine", "green aventurine"],
      materials: "Green aventurine, citrine, rose quartz",
      story: "A growth-oriented combination for creative expansion, warmth, and gentle forward motion.",
      insight:
        "Wood and fire are translated into green and warm stones, keeping the output as jewelry personalization.",
    },
    {
      name: "Water Metal Clarity",
      price: "$118",
      palette: "protection",
      tags: ["clarity", "obsidian", "cool tone"],
      materials: "Labradorite, clear quartz, black obsidian",
      story: "A reflective, protective palette for clarity and energetic boundaries.",
      insight:
        "Water and metal are expressed through cool, reflective, and clear materials without promising prediction or protection outcomes.",
    },
  ],
};

let activeMode = initialMode;
let selectedProduct = products[activeMode][0];
let cartItems = Number(localStorage.getItem("oneBraceletCartItems") || "0");

function beadMarkup(paletteName) {
  return palettes[paletteName].map((color) => `<span class="bead" style="background:${color}"></span>`).join("");
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function syncCart() {
  if (cartCount) cartCount.textContent = String(cartItems);
  localStorage.setItem("oneBraceletCartItems", String(cartItems));
}

function setMode(mode) {
  activeMode = mode;
  modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.mode === mode));
  modePanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === mode));

  const firstProduct = products[mode][0];
  if (previewTitle) previewTitle.textContent = firstProduct.name;
  if (previewText) previewText.textContent = firstProduct.story;
  if (previewBeads) previewBeads.innerHTML = beadMarkup(firstProduct.palette);

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("mode", mode);
  window.history.replaceState({}, "", nextUrl);
}

function renderResults(mode = activeMode) {
  if (!recommendationCards) return;
  const list = products[mode];
  selectedProduct = list[0];
  const contexts = {
    personality: "Personality customization complete. Three purchase-ready recommendations are shown below.",
    wrist: "Wrist AI try-on generated. Preview images should include an AI Preview watermark before purchase.",
    birth:
      "Birth energy reading complete. Local birth time is converted to Beijing time before Five Elements-inspired matching.",
  };

  if (resultContext) resultContext.textContent = contexts[mode];
  if (regenerateLink) regenerateLink.href = `./customize.html?mode=${mode}`;

  recommendationCards.innerHTML = list
    .map(
      (product, index) => `
        <article class="recommendation-card ${index === 0 ? "is-selected" : ""}">
          <div class="card-topline">
            <span>Design ${index + 1}</span>
            <strong class="card-price">${product.price}</strong>
          </div>
          <div class="card-beads">${beadMarkup(product.palette)}</div>
          <h3>${product.name}</h3>
          <p>${product.story}</p>
          <p><strong>Materials:</strong> ${product.materials}</p>
          <div class="tag-row">${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          <button class="select-design" type="button" data-index="${index}">Choose This Design</button>
        </article>
      `,
    )
    .join("");

  syncSelected(selectedProduct);
}

function syncSelected(product) {
  selectedProduct = product;
  if (selectedName) selectedName.textContent = product.name;
  if (selectedStory) selectedStory.textContent = product.story;
  if (selectedPrice) selectedPrice.textContent = product.price;
  if (insightCopy) insightCopy.textContent = product.insight;

  [...document.querySelectorAll(".recommendation-card")].forEach((card) => {
    card.classList.toggle("is-selected", card.querySelector("h3")?.textContent === product.name);
  });
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const mode = form.dataset.form;
    window.location.href = `./results.html?mode=${mode}`;
  });
});

recommendationCards?.addEventListener("click", (event) => {
  const button = event.target.closest(".select-design");
  if (!button) return;
  const product = products[activeMode][Number(button.dataset.index)];
  syncSelected(product);
  showToast(`${product.name} selected for checkout.`);
});

wristUpload?.addEventListener("change", () => {
  const file = wristUpload.files?.[0];
  if (!file) return;
  const src = URL.createObjectURL(file);
  if (wristPreview) wristPreview.src = src;
  if (resultWrist) resultWrist.src = src;
  showToast("Wrist photo loaded. The upload path remains available after camera denial.");
});

document.querySelector("#takePhoto")?.addEventListener("click", () => {
  showToast("Camera permission should be requested here, after this click only.");
});

buyButton?.addEventListener("click", () => {
  cartItems += 1;
  syncCart();
  showToast("Draft order snapshot locked. Inventory should be verified before payment.");
});

window.addEventListener("load", () => {
  if (window.lucide) window.lucide.createIcons();
});

syncCart();
if (modeButtons.length) setMode(activeMode);
renderResults(activeMode);
