// src/app/docs/layout.tsx
import { getAllDocs } from '../../lib/markdown';
import { DocsSidebar } from '../../components/DocsSidebar';

interface Doc {
  slug: string;
  title: string;
  index: number;
}

interface DocTreeNode {
  [key: string]: DocTreeNode | { __doc: Doc };
}

function groupDocsByFolder(docs: Doc[]): DocTreeNode {
  const tree: DocTreeNode = {};

  for (const doc of docs) {
    const parts = doc.slug.split('/');
    let current: DocTreeNode = tree;

    parts.forEach((part, index) => {
      if (!(part in current)) {
        current[part] = index === parts.length - 1
          ? { __doc: doc }
          : {};
      }
      current = current[part] as DocTreeNode;
    });
  }

  return tree;
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllDocs().sort((a, b) => a.index - b.index);
  const groupedDocs = groupDocsByFolder(docs);

  return (
    <div className="flex h-full">
      <DocsSidebar groupedDocs={groupedDocs} />
      <main className="flex-grow px-8 md:px-16 py-8 overflow-y-auto bg-white dark:bg-gray-950 scrollbar scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 dark:hover:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="prose dark:prose-invert prose-slate max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
}
