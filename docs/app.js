const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRsYk9zMtRgmgUxjZ1gu8QpM5dHgMnuR_RlIkmi3AtCKJlVOV2W4RRv68XeIt5AfCDA14gcEneh9Es/pub?output=csv';

let currentFilter = "";

function init() {
  fetch(csvUrl)
    .then(res => res.text())
    .then(csvText => {
      const rows = csvText.split('\n').slice(1); // skip header
      const products = rows.map(row => {
        const [name, profit, saturation, tag, vendorLink] = row.split(',');
        return { name, profit, saturation, tag, vendorLink };
      });
      showInfo(products);
    })
    .catch(err => {
      console.error("Error loading CSV:", err);
    });
}

function showInfo(data) {
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

function displayResults(products, query) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  let filtered = products.filter(p =>
    p.name &&
    !isNaN(parseFloat(p.profit)) &&
    p.name.toLowerCase().includes(query)
  );

  if (currentFilter === "profit") {
    filtered = filtered.filter(p => parseFloat(p.profit) >= 40);
  } else if (currentFilter === "low") {
    filtered = filtered.filter(p =>
      p.saturation && p.saturation.toLowerCase().includes("low")
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

window.addEventListener('DOMContentLoaded', init);
