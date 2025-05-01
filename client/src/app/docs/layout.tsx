import Link from 'next/link';
import { getAllDocs } from '../../lib/markdown';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const docs = getAllDocs();

    return (
        <div className="flex h-full">
            <nav className="w-64 px-4 py-6 border-r border-gray-800/20 dark:border-white/20 h-full bg-gray-50 dark:bg-gray-900/50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-6 px-2 text-gray-800 dark:text-gray-200">Documentation</h2>
                <ul className="space-y-2">
                    {docs.slice()
                        .sort((a, b) => a.index - b.index)
                        .map(({ slug, title }) => (
                        <li key={slug} className='w-full'>
                            <Link 
                                href={`/docs/${slug}`} 
                                className='px-3 py-2 rounded-md w-full block text-gray-700 dark:text-gray-300 
                                           hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors
                                           font-medium text-sm'
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex-grow px-8 md:px-16 py-8 overflow-y-auto bg-white dark:bg-gray-950 scrollbar scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 dark:hover:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <div className="prose dark:prose-invert prose-slate max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
}
