// src/components/DocsSidebar.tsx
"use client";

import Link from 'next/link';
import React, { useState } from 'react';

interface Doc {
  slug: string;
  title: string;
  index: number;
}

interface DocTreeNode {
  [key: string]: DocTreeNode | { __doc: Doc };
}

interface Props {
  groupedDocs: DocTreeNode;
}

export function DocsSidebar({ groupedDocs }: Props) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  function toggleFolder(path: string) {
    setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }));
  }

  function renderSidebar(
    tree: DocTreeNode,
    basePath = ''
  ): React.ReactNode {
    return (
      <ul className="pl-2 space-y-1">
        {Object.entries(tree).map(([key, value]) => {
          const currentPath = basePath ? `${basePath}/${key}` : key;

          if ('__doc' in value) {
            const doc = value.__doc;
            return (
              <li key={doc.slug}>
                <Link 
                  href={`/docs/${doc.slug}`}
                  className="px-3 py-2 rounded-md block text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors font-medium text-sm"
                >
                  {doc.title}
                </Link>
              </li>
            );
          } else {
            const isOpen = !!openFolders[currentPath];
            return (
              <li key={currentPath}>
                <div
                  onClick={() => toggleFolder(currentPath)}
                  className="flex cursor-pointer items-center px-2 py-1 font-semibold text-gray-600 dark:text-gray-400 select-none hover:bg-gray-200/70 dark:hover:bg-gray-800/70 rounded-md"
                >
                  <svg
                    className={`mr-2 h-4 w-4 transform transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {key.replace(/[-_]/g, ' ')}
                </div>
                {isOpen && renderSidebar(value as DocTreeNode, currentPath)}
              </li>
            );
          }
        })}
      </ul>
    );
  }

  return (
    <nav className="w-64 px-4 py-6 border-r border-gray-800/20 dark:border-white/20 h-full bg-gray-50 dark:bg-gray-900/50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <h2 className="text-xl font-bold mb-6 px-2 text-gray-800 dark:text-gray-200">Documentation</h2>
      {renderSidebar(groupedDocs)}
    </nav>
  );
}
