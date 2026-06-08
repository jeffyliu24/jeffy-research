const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const postsDir = path.join(root, "posts");
const outputFile = path.join(root, "posts-data.js");

function parseFrontMatter(source, fileName) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`${fileName} is missing front matter`);
  }

  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    meta[key] = value;
  });

  const required = ["title", "type", "category", "date", "summary", "tags"];
  required.forEach((key) => {
    if (!meta[key]) {
      throw new Error(`${fileName} is missing "${key}"`);
    }
  });

  return {
    slug: path.basename(fileName, ".md"),
    title: meta.title,
    type: meta.type,
    category: meta.category,
    date: meta.date,
    summary: meta.summary,
    tags: meta.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    content: match[2].trim()
  };
}

function build() {
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .sort();

  const posts = files.map((file) => {
    const source = fs.readFileSync(path.join(postsDir, file), "utf8");
    return parseFrontMatter(source, file);
  });

  const output = `window.blogPosts = ${JSON.stringify(posts, null, 2)};\n`;
  fs.writeFileSync(outputFile, output, "utf8");
  console.log(`Built ${posts.length} posts into posts-data.js`);
}

build();
