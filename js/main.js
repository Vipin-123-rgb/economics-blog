/* =====================================================
   GLOBAL STATE
===================================================== */
let allNews = [];

/* =====================================================
   GENERIC LOADER (Analysis + Research)
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
            div.className = `blog-card news-card ${item.ca
