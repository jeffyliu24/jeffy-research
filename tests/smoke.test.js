const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const index = read("index.html");
const css = read("styles.css");
const app = read("app.js");
const postData = read("posts-data.js");

assert(index.includes("<title>jeffy | 文献笔记与技术想法</title>"), "index title should describe jeffy");
assert(index.includes('id="notes"'), "index should include literature notes section");
assert(index.includes('id="ideas"'), "index should include technical ideas section");
assert(index.includes('id="reader"'), "index should include full article reader section");
assert(index.includes('src="posts-data.js"'), "index should load generated post data");
assert(css.includes("--sage-dark"), "styles should define the core color palette");
assert(css.includes(".reader-content"), "styles should include reader article styles");
assert(css.includes(".table-wrap"), "styles should include table support");
assert(css.includes(".reader-content img"), "styles should include image support");
assert(app.includes("window.blogPosts"), "app should read generated post data");
assert(app.includes('href = `#post-${post.slug}`'), "post cards should link to full articles");
assert(postData.includes('"category": "literature"'), "generated data should include literature posts");
assert(postData.includes('"category": "idea"'), "generated data should include idea posts");
assert(postData.includes('"content"'), "generated data should include long-form content");
assert(fs.existsSync(path.join(root, "notes", "literature-template.md")), "literature template should exist");
assert(fs.existsSync(path.join(root, "notes", "technical-idea-template.md")), "technical idea template should exist");
assert(fs.existsSync(path.join(root, "posts", "how-to-read-a-paper.md")), "posts directory should contain markdown articles");

console.log("Smoke tests passed.");
