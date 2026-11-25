import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Build-time only. This deliberately supports only the simple Markdown used in the policy.
// No raw HTML, images, embedded content, scripts, or runtime Markdown dependencies.
const source = readFileSync(new URL('../PRIVACY_POLICY.md', import.meta.url), 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const inline = text => {
  const pattern = /`([^`]+)`|\[([^\]]+)\]\(((?:https:\/\/|mailto:)[^\s)]+)\)/g;
  let result = '', end = 0;
  for (const match of text.matchAll(pattern)) {
    result += escape(text.slice(end, match.index));
    result += match[1] ? `<code>${escape(match[1])}</code>` :
      `<a href="${escape(match[3])}">${escape(match[2])}</a>`;
    end = match.index + match[0].length;
  }
  return result + escape(text.slice(end));
};
const headings = [];
const body = source.trim().split(/\n\s*\n/).map(block => {
  const heading = block.match(/^(#{1,3}) (.+)$/);
  if (heading) {
    const level = heading[1].length;
    const id = heading[2].replace(/^\d+\. /, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
    if (level === 2) headings.push({ title: heading[2], id });
    return `<h${level} id="${id}">${inline(heading[2])}</h${level}>`;
  }
  if (block.startsWith('- ')) {
    return `<ul>\n${block.split('\n').map(line => {
      if (!line.startsWith('- ')) throw new Error('Unsupported multiline list item');
      return `<li>${inline(line.slice(2))}</li>`;
    }).join('\n')}\n</ul>`;
  }
  return `<p>${inline(block.replaceAll('\n', ' '))}</p>`;
}).join('\n');
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="How doLauncher handles tasks, notes, contacts, calendar information, steps, Android backups and your privacy choices.">
  <meta name="referrer" content="no-referrer">
  <meta name="theme-color" content="#ffffff">
  <title>doLauncher Privacy Policy</title>
  <link rel="stylesheet" href="./policy.css">
</head>
<body>
  <a class="skip-link" href="#policy">Skip to privacy policy</a>
  <header><a href="../">doLauncher</a><span>doStudio</span></header>
  <nav aria-label="Privacy policy sections">
    <ol>${headings.map(h => `<li><a href="#${h.id}">${escape(h.title.replace(/^\d+\. /, ''))}</a></li>`).join('')}</ol>
  </nav>
  <main id="policy" tabindex="-1">
${body}
  </main>
  <footer><a href="../">About doLauncher</a><a href="mailto:olledavegardh@gmail.com">Privacy contact</a></footer>
</body>
</html>
`;
const target = new URL('../public/privacy/index.html', import.meta.url);
writeFileSync(target, html);
console.log(`Built ${fileURLToPath(target)} from PRIVACY_POLICY.md`);
