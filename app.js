const posts = window.blogPosts || [];

function formatDate(dateText) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(`${dateText}T00:00:00`));
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function renderImage(text) {
  const match = text.match(/^!\[(.*?)]\((.*?)\)$/);
  if (!match) return "";

  const alt = escapeHtml(match[1]);
  const src = escapeHtml(match[2]);
  return `<figure><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`;
}

function renderTable(text) {
  const rows = text.split("\n").map((row) =>
    row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => renderInlineMarkdown(cell.trim()))
  );
  const header = rows[0];
  const body = rows.slice(2);

  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${header.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>
          ${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderList(text) {
  const items = text
    .split("\n")
    .map((line) => line.replace(/^- /, "").trim())
    .filter(Boolean);

  return `<ul>${items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`;
}

function renderArticleContent(content) {
  const blocks = content.trim().split(/\n{2,}/);

  return blocks
    .map((block) => {
      const text = block.trim();
      if (text.startsWith("### ")) {
        return `<h4>${renderInlineMarkdown(text.slice(4))}</h4>`;
      }
      if (text.startsWith("## ")) {
        return `<h3>${renderInlineMarkdown(text.slice(3))}</h3>`;
      }
      if (text.startsWith("![")) {
        return renderImage(text);
      }
      if (/^\|.+\|\n\|[-:|\s]+\|/.test(text)) {
        return renderTable(text);
      }
      if (/^- /m.test(text)) {
        return renderList(text);
      }
      return `<p>${renderInlineMarkdown(text).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function createTag(tag) {
  const tagEl = document.createElement("span");
  tagEl.className = "tag";
  tagEl.textContent = tag;
  return tagEl;
}

function createPostCard(post) {
  const template = document.querySelector("#postCardTemplate");
  const card = template.content.firstElementChild.cloneNode(true);
  card.querySelector(".post-type").textContent = post.type;
  card.querySelector("time").dateTime = post.date;
  card.querySelector("time").textContent = formatDate(post.date);
  card.querySelector("h3").textContent = post.title;
  card.querySelector("p").textContent = post.summary;
  card.querySelector(".read-link").href = `#post-${post.slug}`;

  const tagRow = card.querySelector(".tag-row");
  post.tags.forEach((tag) => tagRow.append(createTag(tag)));

  return card;
}

function renderPosts(targetId, filteredPosts) {
  const target = document.querySelector(targetId);
  target.replaceChildren(...filteredPosts.map(createPostCard));
}

function showPostFromHash() {
  const slug = window.location.hash.replace("#post-", "");
  const post = posts.find((item) => item.slug === slug);
  const reader = document.querySelector("#reader");

  if (!post) {
    reader.hidden = true;
    return;
  }

  document.querySelector("#readerType").textContent = post.type;
  document.querySelector("#readerDate").dateTime = post.date;
  document.querySelector("#readerDate").textContent = formatDate(post.date);
  document.querySelector("#readerTitle").textContent = post.title;
  document.querySelector("#readerTags").replaceChildren(...post.tags.map(createTag));
  document.querySelector("#readerContent").innerHTML = renderArticleContent(post.content);
  reader.hidden = false;
  reader.scrollIntoView({ block: "start" });
}

function boot() {
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const literature = sortedPosts.filter((post) => post.category === "literature");
  const ideas = sortedPosts.filter((post) => post.category === "idea");

  renderPosts("#latestPosts", sortedPosts.slice(0, 3));
  renderPosts("#literaturePosts", literature);
  renderPosts("#ideaPosts", ideas);

  document.querySelector("#noteCount").textContent = literature.length;
  document.querySelector("#ideaCount").textContent = ideas.length;
  showPostFromHash();
}

window.addEventListener("hashchange", showPostFromHash);
boot();
