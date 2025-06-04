"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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

const folderConfig: Record<
  string,
  { displayName: string; order: number }
> = {
  tutorials: { displayName: "Tutorials", order: 1 },
  explanation: { displayName: "Explanation", order: 3 },
  "how-to": { displayName: "How-to Guides", order: 2 },
  reference: { displayName: "Technical Reference", order: 4 },
};

export function DocsSidebar({ groupedDocs }: Props) {
  const pathname = usePathname();
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  // Expand folders on initial load based on current path
  useEffect(() => {
    if (!pathname?.startsWith('/docs/')) return;

    const slugPath = pathname.replace('/docs/', '').split('/');
    const pathsToOpen: Record<string, boolean> = {};

    slugPath.slice(0, -1).reduce((acc, part) => {
      const newPath = acc ? `${acc}/${part}` : part;
      pathsToOpen[newPath] = true;
      return newPath;
    }, '');

    setOpenFolders(pathsToOpen);
  }, [pathname]);

    function toggleFolder(path: string) {
    setOpenFolders(prev => {
        const segments = path.split('/');
        const level = segments.length;
        const newState: Record<string, boolean> = {};

        // Close all folders at this level
        Object.entries(prev).forEach(([key, isOpen]) => {
        if (key.split('/').length !== level) {
            newState[key] = isOpen;
        }
        });

        // Toggle the clicked folder
        if (!prev[path]) {
        newState[path] = true;
        }

        return newState;
    });
    }


    function renderSidebar(
    tree: DocTreeNode,
    basePath = ''
    ): React.ReactNode {
    const activeSlug = pathname?.replace(/^\/docs\//, '');

    // Separate folders and docs
    const folders = Object.entries(tree).filter(([_, v]) => !('__doc' in v));
    const docs = Object.entries(tree).filter(([_, v]) => '__doc' in v);

    // Sort docs by their index property ascending
    docs.sort(([, a], [, b]) => {
        const docA = (a as { __doc: Doc }).__doc;
        const docB = (b as { __doc: Doc }).__doc;
        return docA.index - docB.index;
    });

    // Sort folders by order from config, fallback alphabetical
    folders.sort(([a], [b]) => {
        const orderA = folderConfig[a]?.order ?? 999;
        const orderB = folderConfig[b]?.order ?? 999;
        if (orderA === orderB) return a.localeCompare(b);
        return orderA - orderB;
    });

    return (
        <ul className="pl-2 space-y-1">
        {/* Render files first */}
        {docs.map(([_, value]) => {
            const doc = (value as { __doc: Doc }).__doc;
            const isActive = doc.slug === activeSlug;

            return (
            <li key={doc.slug}>
                <Link
                href={`/docs/${doc.slug}`}
                className={`px-3 py-2 rounded-md block text-gray-700 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors font-medium text-sm
                    ${isActive ? 'bg-gray-200/50 dark:bg-gray-800/50 text-white' : ''}
                `}
                >
                {doc.title}
                </Link>
            </li>
            );
        })}

        {/* Then render folders */}
        {folders.map(([key, value]) => {
            const currentPath = basePath ? `${basePath}/${key}` : key;
            const displayName = folderConfig[key]?.displayName ?? key.replace(/[-_]/g, ' ');
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
                {displayName}
                </div>
                {isOpen && renderSidebar(value as DocTreeNode, currentPath)}
            </li>
            );
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
