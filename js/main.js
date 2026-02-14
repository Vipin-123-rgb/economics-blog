fetch("posts/posts.json")
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById("blog-container");

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "blog-card";

      div.innerHTML = `
        <h3>${post.title}</h3>
        <small>${post.date}</small>
        <p><b>Summary:</b> ${post.summary}</p>
        <p>${post.analysis}</p>
      `;

      container.appendChild(div);
    });
  });
