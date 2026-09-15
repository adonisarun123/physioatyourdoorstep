const fs=require('fs'),path=require('path'),matter=require('gray-matter');
const files=['advanced-neuro-physiotherapy-techniques','acbt-in-physiotherapy'];
const blogs=new Set(fs.readdirSync('content/blogs').map(f=>f.replace(/\.md$/,'')));
const svcs=new Set(fs.readdirSync('markdown').map(f=>f.replace(/\.md$/,'')));
const statics=new Set(['','blogs','booking','locations','contact-us','about-us','media-coverage','careers','privacy-policy','terms-of-service']);
for(const f of files){
  const raw=fs.readFileSync(`content/blogs/${f}.md`,'utf8');
  const g=matter(raw);
  console.log('===',f);
  console.log(' fm:',JSON.stringify(g.data));
  console.log(' metaTitle len:',g.data.metaTitle.length,'metaDesc len:',g.data.metaDescription.length);
  console.log(' words:',g.content.split(/\s+/).length);
  console.log(' cover exists:',fs.existsSync('public'+g.data.coverImage));
  const bad=[...g.content.matchAll(/\]\((\/[^)\s]*)\)/g)].map(m=>m[1]).filter(u=>{
    const p=u.replace(/^\//,'').replace(/\/$/,'');
    if(statics.has(p))return false;
    if(p.startsWith('service/'))return !svcs.has(p.slice(8));
    return !blogs.has(p);
  });
  console.log(' broken internal links:',bad.length?bad:'none');
  const esc=[...g.content.matchAll(/\\[+~*.]/g)].map(m=>m[0]);
  console.log(' stray escapes:',esc.length?[...new Set(esc)]:'none');
  console.log(' bold headings left:',/^#+\s+\*\*/m.test(g.content));
  console.log(' h1 in body:',/^#\s/m.test(g.content));
  const faq=g.content.match(/^##[ \t]+Frequently Asked Questions[^\n]*\r?\n([\s\S]*?)(?=\n##[ \t](?!#)|$(?![\s\S]))/im);
  console.log(' FAQ Qs:',faq?(faq[1].match(/^###\s/gm)||[]).length:0);
}
