import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const docsDirectory = path.join(process.cwd(), 'docs');

export function getDocSlugs() {
  return fs.readdirSync(docsDirectory).map((file) => file.replace('.md', ''));
}

export async function getDocBySlug(slug) {
  const fullPath = path.join(docsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { slug, contentHtml, ...data };
}
