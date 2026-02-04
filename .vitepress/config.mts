import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sidebarFile = path.resolve(rootDir, '_sidebar.md');

type SidebarItem = {
  text: string;
  link?: string;
  items?: SidebarItem[];
};

function normalizeLink(raw: string): string {
  if (raw.startsWith('http')) return raw;
  const noHash = raw.replace(/#.*$/, '');
  let clean = noHash.replace(/\.md$/, '').replace(/^\./, '');
  if (!clean.startsWith('/')) clean = `/${clean}`;
  return clean;
}

function parseLink(content: string): { text: string; link?: string } {
  const mdMatch = content.match(/^\[(.+?)\]\((.+?)\)$/);
  if (mdMatch) {
    return { text: mdMatch[1].trim(), link: normalizeLink(mdMatch[2].trim()) };
  }

  const htmlMatch = content.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/i);
  if (htmlMatch) {
    return { text: htmlMatch[2].trim(), link: normalizeLink(htmlMatch[1].trim()) };
  }

  return { text: content.trim() };
}

function buildSidebarFromFile(filePath: string): SidebarItem[] {
  if (!fs.existsSync(filePath)) return [];
  const lines = fs
    .readFileSync(filePath, 'utf-8')
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith('*'));

  const root: SidebarItem[] = [];
  const stack: { indent: number; items: SidebarItem[] }[] = [{ indent: -1, items: root }];

  for (const line of lines) {
    const indentMatch = line.match(/^(\s*)\*/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    const content = line.replace(/^\s*\*\s*/, '').trim();
    if (!content) continue;

    const parsed = parseLink(content);
    const item: SidebarItem = parsed.link
      ? { text: parsed.text, link: parsed.link }
      : { text: parsed.text, items: [] };

    while (stack.length && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].items;
    parent.push(item);

    if (item.items) {
      stack.push({ indent, items: item.items });
    }
  }

  return root;
}

const sidebar = buildSidebarFromFile(sidebarFile);

const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? '/devops-fundamentals/' : '/';

export default defineConfig({
  lang: 'tr-TR',
  title: 'Türkçe DevOps Dokümantasyonu',
  description: 'Türkçe DevOps öğrenme kaynakları ve dokümantasyon seti',
  base,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico` }]
  ],
  markdown: {
    languageAlias: {
      promql: 'sql',
      ssh: 'bash'
    }
  },
  cleanUrls: true,
  themeConfig: {
    appearance: 'dark',
    nav: [
      { text: 'Dokümanlar', link: '/' },
      { text: 'Quizler', link: '/13-Interactive-Quizzes/index.html' },
      { text: 'GitHub', link: 'https://github.com/slymanmrcan/devops-fundamentals' }
    ],
    sidebar,
    outline: [2, 3],
    docFooter: { prev: 'Önceki', next: 'Sonraki' },
    search: { provider: 'local' }
  },
  vite: {
    server: {
      port: 3000
    }
  }
});
