/* =====================================================
   GLOBAL STATE
===================================================== */
let allNews = [];

/* =====================================================
   GENERIC LOADER (Analysis, Research, Economics Blogs)
===================================================== */
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

/* =====================================================
   DAILY POLICY & ECONOMIC NEWS (WITH FILTERS)
===================================================== */
fetch("./data/news.json")
    .then(res => res.json())
    .then(data => {
        allNews = data;
        renderNews("all");
    })
    .catch(err => console.error("Error loading news", err));

function renderNews(category) {
    const container = document.getElementById("news-container");
    if (!container) return;

    container.innerHTML = "";

    allNews
        .filter(item => category === "all" || item.category === category)
        .forEach(item => {
            const div = document.createElement("div");
            div.className = `blog-card news-card ${item.category}`;

            div.innerHTML = `
                <div class="news-meta">
                    <span class="news-tag ${item.category}">
                        ${item.category.toUpperCase()}
                    </span>
                    <span class="news-date">
                        ${item.date ? new Date(item.date).toDateString() : ""}
                    </span>
                </div>

                <h3>${item.title}</h3>
                <small>${item.source}</small>
                <p>${item.summary}</p>
                <a href="${item.link}" target="_blank">
                    Read official source →
                </a>
            `;

            container.appendChild(div);
        });
}

/* =====================================================
   FILTER BUTTON HANDLER
===================================================== */
document.addEventListener("click", function (e) {
    if (e.target.matches(".filter-bar button")) {
        document
            .querySelectorAll(".filter-bar button")
            .forEach(btn => btn.classList.remove("active"));

        e.target.classList.add("active");
        renderNews(e.target.dataset.category);
    }
});

/* =====================================================
   ECONOMIC & AI ANALYSIS
===================================================== */
loadData(
    "analysis.json",
    "analysis-container",
    item => `
        <h3>${item.topic}</h3>
        <p>${item.explanation}</p>
        <p><strong>AI / Economic Insight:</strong> ${item.implication}</p>
    `
);

/* =====================================================
   ECONOMICS BLOGS (FULL ARTICLES)
===================================================== */
loadData(
    "economics.json",
    "economics-container",
    item => `
        <h3>${item.title}</h3>
        <small>${item.date} | ${item.author}</small>
        <p><strong>Summary:</strong> ${item.summary}</p>
        <p>${item.content.replace(/\n/g, "<br><br>")}</p>
    `
);

/* =====================================================
   RESEARCH & INTERNATIONAL RELATIONS
===================================================== */
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

/* =====================================================
   EMAIL PROTECTION (ANTI-SPAM)
===================================================== */
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


document.getElementById("global-search")?.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".blog-card").forEach(card => {
        card.style.display =
            card.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
});
