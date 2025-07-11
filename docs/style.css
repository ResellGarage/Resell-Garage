const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRsYk9zMtRgmgUxjZ1gu8QpM5dHgMnuR_RlIkmi3AtCKJlVOV2W4RRv68XeIt5AfCDA14gcEneh9Es/pub?output=csv';

let productData = [];

function init() {
  fetch(csvUrl)
    .then(res => res.text())
    .then(csvText => {
      const rows = csvText.split('\n').slice(1);
      productData = rows.map(row => {
        const [name, profit, saturation, tag, vendorLink] = row.split(',');
        return { name, profit: parseFloat(profit), saturation, tag, vendorLink };
      });
      setupFilters();
      displayResults(productData, "");
    });
}

function setupFilters() {
  const searchInput = document.getElementById("searchInput");
  const profitFilter = document.getElementById("profitFilter");
  const saturationFilter = document.getElementById("saturationFilter");

  searchInput.addEventListener("input", () => applyFilters());
  profitFilter.addEventListener("change", () => applyFilters());
  saturationFilter.addEventListener("change", () => applyFilters());
}

function applyFilters() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const profitType = document.getElementById("profitFilter").value;
  const saturationType = document.getElementById("saturationFilter").value;

  let filtered = productData.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  if (profitType === "high") filtered = filtered.filter(p => p.profit >= 40);
  if (profitType === "low") filtered = filtered.filter(p => p.profit < 40);

  if (saturationType) {
    filtered = filtered.filter(p =>
      p.saturation.toLowerCase() === saturationType
    );
  }

  displayResults(filtered);
}

function displayResults(products) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (products.length === 0) {
    results.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(p => {
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
