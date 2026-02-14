let blogs = [];
let currentPage = 1;
const perPage = 3;

fetch("../data/economics.json")
    .then(res => res.json())
    .then(data => {
        blogs = data;
        render();
    });

function render() {
    const container = document.getElementById("economics-container");
    const start = (currentPage - 1) * perPage;
    const paginated = blogs.slice(start, start + perPage);

    container.innerHTML = "";
    paginated.forEach(item => {
        const div = document.createElement("div");
        div.className = "blog-card";
        div.innerHTML = `
            <h3>${item.title}</h3>
            <small>${item.date} | ${item.author}</small>
            <p><strong>Summary:</strong> ${item.summary}</p>
            <p>${item.content.replace(/\n/g, "<br><br>")}</p>
            ${renderSources(item.sources)}
        `;
        container.appendChild(div);
    });

    document.getElementById("page-info").innerText =
        `Page ${currentPage} of ${Math.ceil(blogs.length / perPage)}`;
}

function renderSources(sources) {
    if (!sources) return "";
    return `
        <div class="source-box">
            <strong>Sources:</strong>
            <ul>
                ${sources.map(s => `<li>${s}</li>`).join("")}
            </ul>
        </div>
    `;
}

document.getElementById("next").onclick = () => {
    if (currentPage * perPage < blogs.length) {
        currentPage++;
        render();
    }
};

document.getElementById("prev").onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
};

/* SEARCH */
document.getElementById("search-input").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    blogs = blogs.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q)
    );
    currentPage = 1;
    render();
});
