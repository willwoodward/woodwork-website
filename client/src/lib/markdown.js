import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const docsDirectory = path.join(process.cwd(), 'src', 'docs'); // Ensure this points to the correct docs directory

export async function getDocBySlug(slug) {
  const fullPath = path.join(docsDirectory, `${slug}.md`);
  console.log(fullPath); // Debugging

  // Use fs.promises.readFile instead of fs.readFileSync for async file reading
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const { title, description } = data;

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { slug, contentHtml, title, description, ...data };
}

export function getAllDocs() {
    return fs.readdirSync(docsDirectory)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const fullPath = path.join(docsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
  
        return {
          slug: file.replace('.md', ''),
          title: data.title || 'Untitled'
        };
    });
}
