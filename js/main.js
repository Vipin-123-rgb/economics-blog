/* ================= COMMON LOADER ================= */
function loadData(file, containerId, template) {
    fetch(`./data/${file}`)
        .then(res => res.json())
        .then(items => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = "";
            items.forEach(item => {
                const div = document.createElement("div");
                div.className = "blog-card";
                div.innerHTML = template(item);
                container.appendChild(div);
            });
        })
        .catch(err => console.error("Error loading", file, err));
}

/* ================= DAILY POLICY & ECONOMIC NEWS ================= */
loadData(
    "news.json",
    "news-container",
    item => `
        <h3>${item.title}</h3>
        <small>Source: ${item.source}</small>
        <p>${item.summary}</p>
        <a href="${item.link}" target="_blank">Official Source</a>
    `
);

/* ================= ECONOMIC & AI ANALYSIS ================= */
loadData(
    "analysis.json",
    "analysis-container",
    item => `
        <h3>${item.topic}</h3>
        <p>${item.explanation}</p>
        <p><strong>AI / Economic Insight:</strong> ${item.implication}</p>
    `
);

/* ================= RESEARCH & IR ================= */
loadData(
    "research.json",
    "research-container",
    item => `
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <p><strong>Method:</strong> ${item.method}</p>
        <p><strong>Global / Policy Relevance:</strong> ${item.policy_use}</p>
    `
);

/* ================= EMAIL PROTECTION ================= */
/* ================= EMAIL PROTECTION ================= */
(function () {
    const user = "tripathivipin99";
    const domain = "gmail.com";
    const emailEl = document.getElementById("email");

    if (emailEl) {
        emailEl.innerHTML = `<a href="mailto:${user}@${domain}">
            ${user} [at] ${domain}
        </a>`;
    }
})();

