// One-off cleanup of WordPress-imported markdown.
// Fixes: themify junk links, absolute internal links + trailing slashes,
// orphaned "**" marker lines, code-block-causing indentation, and
// table cell wrapper tags. Run: node scripts/fix-content.mjs [--dry]
import fs from "fs";
import path from "path";

const DRY = process.argv.includes("--dry");
const ROOT = process.cwd();
const DIRS = ["content/blogs", "content/locations", "content/pages"];

const listMarker = /^([-*+]|\d+\.)\s/;
const stats = { files: 0, themify: 0, absLinks: 0, orphanBold: 0, dedented: 0, tableTags: 0 };

function walk(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const f of fs.readdirSync(dir)) {
        if (f.endsWith(".md")) out.push(path.join(dir, f));
    }
    return out;
}

function splitFrontmatter(text) {
    if (!text.startsWith("---")) return { fm: "", body: text };
    const end = text.indexOf("\n---", 3);
    if (end === -1) return { fm: "", body: text };
    const close = text.indexOf("\n", end + 1);
    return { fm: text.slice(0, close + 1), body: text.slice(close + 1) };
}

for (const file of DIRS.flatMap(walk)) {
    const original = fs.readFileSync(file, "utf8");
    const { fm, body } = splitFrontmatter(original);
    let b = body;

    // 1. Unwrap themify.org junk links -> keep the visible text.
    b = b.replace(/\[([^\]]+)\]\(https?:\/\/(?:www\.)?themify\.org\/?\)/g, (_m, t) => {
        stats.themify++;
        return t;
    });

    // 2. Table files: strip <p>/<span> wrapper tags so cells render cleanly.
    if (/<table/i.test(b)) {
        const before = b;
        b = b.replace(/<\/?(p|span)>/gi, "");
        if (before !== b) stats.tableTags++;
    }

    // 3. Absolute internal links -> relative, then strip trailing slash (keep root).
    b = b.replace(/https?:\/\/(?:www\.)?physioatyourdoorstep\.com\//g, () => {
        stats.absLinks++;
        return "/";
    });
    // Collapse "](/path/)" -> "](/path)"; leaves "](/)" untouched.
    b = b.replace(/\]\((\/[^)]*?)\/\)/g, "]($1)");

    // 4. Line-level cleanup.
    const lines = b.split("\n");
    const cleaned = [];
    for (const line of lines) {
        // Drop orphaned bold-delimiter-only lines (indented "**").
        if (/^\s*\*\*\s*$/.test(line)) {
            stats.orphanBold++;
            continue;
        }
        // Dedent lines indented 4+ spaces that are NOT list items
        // (prevents accidental Markdown code blocks). Nested lists (kept
        // at their indentation) are preserved.
        if (/^ {4,}\S/.test(line) && !listMarker.test(line.trimStart())) {
            stats.dedented++;
            cleaned.push(line.trimStart());
            continue;
        }
        cleaned.push(line);
    }
    b = cleaned.join("\n");
    // Collapse 3+ blank lines left behind into a single blank line.
    b = b.replace(/\n{3,}/g, "\n\n");

    if (b !== body) {
        stats.files++;
        if (!DRY) fs.writeFileSync(file, fm + b);
    }
}

console.log((DRY ? "[DRY RUN] " : "") + "Content cleanup:");
console.log(JSON.stringify(stats, null, 2));
