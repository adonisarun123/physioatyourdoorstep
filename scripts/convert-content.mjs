// Converts raw WP JSON (content/_raw) into markdown content files.
// Usage: node scripts/convert-content.mjs
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const RAW = path.join(ROOT, 'content/_raw');
const BLOGS = path.join(ROOT, 'content/blogs');
const LOCS = path.join(ROOT, 'content/locations');
fs.mkdirSync(BLOGS, { recursive: true });
fs.mkdirSync(LOCS, { recursive: true });

// ---------- helpers ----------
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&hellip;/g, "…");

const stripTags = (s) => decode(s.replace(/<[^>]+>/g, '')).trim();

function htmlToMd(html) {
  let s = html;
  // remove comments, scripts, styles
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '');
  // keep tables as raw HTML blocks (rendered via rehype-raw)
  const tables = [];
  s = s.replace(/<table[\s\S]*?<\/table>/gi, (m) => {
    tables.push(m.replace(/\s(class|style|id)="[^"]*"/gi, ''));
    return `\n@@TABLE${tables.length - 1}@@\n`;
  });
  // images -> markdown
  s = s.replace(/<img[^>]*src="([^"]+)"[^>]*>/gi, (m, src) => {
    const alt = (m.match(/alt="([^"]*)"/i) || [])[1] || '';
    return `\n![${alt}](${src})\n`;
  });
  // links
  s = s.replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, txt) => {
    const t = stripTags(txt);
    return t ? `[${t}](${href})` : '';
  });
  // headings
  for (let i = 1; i <= 6; i++) {
    const re = new RegExp(`<h${i}[^>]*>([\\s\\S]*?)</h${i}>`, 'gi');
    s = s.replace(re, (_, t) => `\n\n${'#'.repeat(Math.min(i + 0, 6))} ${stripTags(t)}\n\n`);
  }
  // bold/italic
  s = s.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${stripTags(t)}**`);
  s = s.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `*${stripTags(t)}*`);
  // list items
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `\n- ${decode(t.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()}`);
  s = s.replace(/<\/?(ul|ol)[^>]*>/gi, '\n');
  // paragraphs & breaks
  s = s.replace(/<\/p>/gi, '\n\n').replace(/<p[^>]*>/gi, '');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/?(div|span|section|figure|figcaption|blockquote)[^>]*>/gi, '\n');
  // leftover tags
  s = s.replace(/<[^>]+>/g, '');
  s = decode(s);
  // restore tables
  s = s.replace(/@@TABLE(\d+)@@/g, (_, n) => `\n${tables[+n]}\n`);
  // normalize whitespace
  s = s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

const CATS = [
  ['Neurological Physiotherapy', /neuro|stroke|parkinson|wrist-drop|autism|cerebral/i],
  ['Geriatric Physiotherapy', /geriatric|elder|senior/i],
  ['Pediatric Physiotherapy', /pediatric|child|autism/i],
  ['Pulmonary Physiotherapy', /pulmonar|copd|chest|breath|lung|pneumonia/i],
  ['Post-Surgical Physiotherapy', /post-surgical|surgery|angioplasty|cabg|knee-surgery|replacement/i],
  ['Physiotherapy at Pregnancy', /pregnan|postnatal|prenatal/i],
  ['Orthopaedic Physiotherapy', /orthopaedic|orthopedic|knee|back|spine|sciatica|arthritis|cervical|lumbar|elbow|cyst|spondylo|schmorl|avascular|rheumatoid|varicose/i],
  ['Sports Physiotherapy', /sports|athlete|acl|pcl/i],
];
const guessCat = (slug, title) => {
  const hay = slug + ' ' + title;
  for (const [c, re] of CATS) if (re.test(hay)) return c;
  return 'Physiotherapy';
};

// ---------- load raw ----------
const load = (prefix) => {
  let out = [];
  for (let p = 1; ; p++) {
    const f = path.join(RAW, `${prefix}-p${p}.json`);
    if (!fs.existsSync(f)) break;
    out = out.concat(JSON.parse(fs.readFileSync(f, 'utf8')));
  }
  return out;
};
const posts = load('posts');
const pages = load('pages');
const media = load('media');
const mediaById = Object.fromEntries(media.map((m) => [m.id, m.source_url]));

const missingImages = {}; // originalUrl -> localPath
const imgLocal = (url, folder) => {
  const base = decodeURIComponent(url.split('/').pop() || 'img')
    .replace(/\.(webp|jpe?g|png|gif)$/i, '')
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .slice(0, 80);
  const ext = (url.match(/\.(webp|jpe?g|png|gif)/i) || ['.jpg', 'jpg'])[1].toLowerCase();
  return `/images/${folder}/${base}.${ext}`;
};

// rewrite remote wp images inside markdown to local paths, queue downloads
function localizeImages(md, folder) {
  return md.replace(/!\[([^\]]*)\]\((https?:\/\/(?:physioatyourdoorstep\.com|ybp\.493\.myftpupload\.com)[^)]+)\)/g, (_, alt, url) => {
    const local = imgLocal(url, folder);
    missingImages[url] = local;
    return `![${alt}](${local})`;
  });
}

const yq = (s) => String(s || '').replace(/"/g, '\\"');

// ---------- blogs ----------
let newBlogs = 0;
for (const p of posts) {
  const slug = p.slug;
  const dest = path.join(BLOGS, `${slug}.md`);
  if (fs.existsSync(dest)) continue;
  const title = stripTags(p.title.rendered);
  const excerpt = stripTags(p.excerpt?.rendered || '').replace(/\s*\[?…\]?\s*$/, '').slice(0, 300);
  let body = htmlToMd(p.content.rendered);
  body = localizeImages(body, 'blog');
  const feat = mediaById[p.featured_media];
  let cover = '';
  if (feat) {
    cover = imgLocal(feat, 'blog');
    missingImages[feat] = cover;
  }
  const fm = [
    '---',
    `title: "${yq(title)}"`,
    `date: "${p.date.slice(0, 10)}"`,
    `metaTitle: "${yq(title)} | Physio At Your Doorstep"`,
    `metaDescription: "${yq(excerpt.slice(0, 160))}"`,
    `excerpt: "${yq(excerpt)}"`,
    cover ? `coverImage: "${cover}"` : null,
    `category: "${guessCat(slug, title)}"`,
    '---',
  ].filter(Boolean).join('\n');
  fs.writeFileSync(dest, fm + '\n\n' + body + '\n');
  newBlogs++;
}

// ---------- missing Bangalore locations ----------
const wanted = {
  'best-physiotherapist-in-bellandur': 'Bellandur',
  'best-physiotherapist-in-varthur': 'Varthur',
  'best-physiotherapist-in-begur': 'Begur',
  'best-physiotherapist-in-kudlu': 'Kudlu',
  'best-physiotherapist-in-electronic-city': 'Electronic City',
  'best-physiotherapist-in-banashankari': 'Banashankari',
  'physiotherapist-in-shivajinagar': 'Shivajinagar',
  'physiotherapist-in-ashok-nagar': 'Ashok Nagar',
  'physiotherapist-in-domlur': 'Domlur',
};
let newLocs = 0;
const pageBySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));
for (const [slug, area] of Object.entries(wanted)) {
  const dest = path.join(LOCS, `${slug}.md`);
  if (fs.existsSync(dest)) continue;
  const p = pageBySlug[slug];
  if (!p) { console.log('NO PAGE for', slug); continue; }
  const title = stripTags(p.title.rendered);
  let body = htmlToMd(p.content.rendered);
  // strip images & form junk from location bodies
  body = body.replace(/!\[[^\]]*\]\([^)]*\)\n?/g, '');
  body = body.replace(/Please enable JavaScript in your browser[^\n]*\n?/g, '');
  const fm = [
    '---',
    `title: "${yq(title)}"`,
    'city: "Bangalore"',
    `area: "${area}"`,
    `metaTitle: "${yq(title)} | Physio At Your Doorstep"`,
    `metaDescription: "Expert home physiotherapy in ${area}, Bangalore. Certified physiotherapists at your doorstep for pain relief, rehab and recovery."`,
    '---',
  ].join('\n');
  fs.writeFileSync(dest, fm + '\n\n' + body + '\n');
  newLocs++;
}

// ---------- check existing blogs for missing cover files ----------
const featBySlug = Object.fromEntries(posts.map((p) => [p.slug, mediaById[p.featured_media]]));
let fixedCovers = 0;
for (const f of fs.readdirSync(BLOGS)) {
  const file = path.join(BLOGS, f);
  const txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/coverImage:\s*"([^"]+)"/);
  const slug = f.replace(/\.md$/, '');
  if (m) {
    const pub = path.join(ROOT, 'public', m[1]);
    if (!fs.existsSync(pub)) {
      const feat = featBySlug[slug];
      if (feat) { missingImages[feat] = m[1]; fixedCovers++; }
      else console.log('NO FEATURED for existing', slug);
    }
  } else {
    const feat = featBySlug[slug];
    if (feat) {
      const local = imgLocal(feat, 'blog');
      missingImages[feat] = local;
      fs.writeFileSync(file, txt.replace(/^---\n/, `---\ncoverImage: "${local}"\n`));
      fixedCovers++;
    }
  }
  // also queue any inline /images/blog refs that don't exist yet
  for (const im of txt.matchAll(/!\[[^\]]*\]\((\/images\/[^)]+)\)/g)) {
    const pub = path.join(ROOT, 'public', im[1]);
    if (!fs.existsSync(pub)) {
      // try to find in media by filename fragment
      const frag = im[1].split('/').pop().replace(/\.[a-z]+$/, '').slice(0, 30);
      const cand = media.find((mm) => mm.source_url.toLowerCase().includes(frag.slice(0, 15)));
      if (cand) missingImages[cand.source_url] = im[1];
    }
  }
}

fs.writeFileSync(path.join(RAW, 'missing-images.json'), JSON.stringify(missingImages, null, 2));
console.log(JSON.stringify({ newBlogs, newLocs, fixedCovers, imagesQueued: Object.keys(missingImages).length, totalPosts: posts.length }));
