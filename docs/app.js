const products = [
    {
        name: "Sp5der Hoodie",
        profit: "$40",
        saturation: "Medium",
        vendorLink: "https://your-gumroad-link.com/sp5der"
    },
    {
        name: "1:1 AirPods Pro",
        profit: "$60",
        saturation: "High",
        vendorLink: "https://your-gumroad-link.com/airpods"
    },
    {
        name: "Chrome Hearts Hat",
        profit: "$25",
        saturation: "Low",
        vendorLink: "https://your-gumroad-link.com/chromehearts"
    }
];

const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    displayResults(query);
});

function displayResults(query) {
    resultsContainer.innerHTML = "";

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0 && query) {
        resultsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Profit:</strong> ${product.profit}</p>
            <p><strong>Saturation:</strong> ${product.saturation}</p>
            <button onclick="window.open('${product.vendorLink}', '_blank')">Get this Vendor</button>
        `;

        resultsContainer.appendChild(card);
    });
}

displayResults("");