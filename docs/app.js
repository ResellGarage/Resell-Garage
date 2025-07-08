const products = [
  {
    name: "Sp5der Hoodie",
    profit: 40,
    saturation: "Medium",
    tag: "🔥 High Profit",
    vendorLink: "https://your-gumroad-link.com/sp5der"
  },
  {
    name: "1:1 AirPods Pro",
    profit: 60,
    saturation: "High",
    tag: "🔥 High Profit",
    vendorLink: "https://your-gumroad-link.com/airpods"
  },
  {
    name: "Chrome Hearts Hat",
    profit: 25,
    saturation: "Low",
    tag: "🧊 Low Saturation",
    vendorLink: "https://your-gumroad-link.com/chromehearts"
  }
];

let currentFilter = "";

const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  displayResults(searchInput.value.toLowerCase());
});

function filterBy(type) {
  currentFilter = type;
  displayResults(searchInput.value.toLowerCase());
}

function resetFilter() {
  currentFilter = "";
  displayResults(searchInput.value.toLowerCase());
}

function displayResults(query) {
  results.innerHTML = "";

  let filtered = products.filter(p => p.name.toLowerCase().includes(query));

  if (currentFilter === "profit") {
    filtered = filtered.filter(p => p.profit >= 40);
  } else if (currentFilter === "low") {
    filtered = filtered.filter(p => p.saturation.toLowerCase() === "low");
  }

  if (filtered.length === 0) {
    results.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${p.name}</h3>
      <p><strong>Profit:</strong> $${p.profit}</p>
      <p><strong>Saturation:</strong> ${p.saturation}</p>
      <span class="tag">${p.tag}</span>
      <button class="vendor-btn" onclick="window.open('${p.vendorLink}', '_blank')">Get This Vendor</button>
    `;
    results.appendChild(card);
  });
}

displayResults("");
