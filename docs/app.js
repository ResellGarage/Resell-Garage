// ✅ This is the correct public URL format
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1KQcp2BuYQ1PQEeaIz0rQnEfanpEM42XPtfxE55EtetI/pubhtml';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
}

function showInfo(data) {
  const results = document.getElementById("results");
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    displayResults(data, searchInput.value.toLowerCase());
  });

  window.filterBy = (type) => {
    currentFilter = type;
    displayResults(data, searchInput.value.toLowerCase());
  };

  window.resetFilter = () => {
    currentFilter = "";
    displayResults(data, searchInput.value.toLowerCase());
  };

  displayResults(data, "");
}

let currentFilter = "";

function displayResults(products, query) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  // Filter products that have valid data and match the query
  let filtered = products.filter(p =>
    p.name &&
    !isNaN(parseFloat(p.profit)) &&
    p.name.toLowerCase().includes(query)
  );

  if (currentFilter === "profit") {
    filtered = filtered.filter(p => parseFloat(p.profit) >= 40);
  } else if (currentFilter === "low") {
    filtered = filtered.filter(p =>
      p.saturation && p.saturation.toLowerCase() === "low"
    );
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

// Start everything once the page loads
window.addEventListener('DOMContentLoaded', init);
