import Link from 'next/link';
import { getAllDocs } from '../../lib/markdown'; // Adjust the path if needed

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const docs = getAllDocs();

    return (
        <div className="flex h-[100vh]">
            <nav className="w-48 px-2 py-4 border-r border-gray-300 h-full">
                <h2 className="text-lg font-bold mb-4 px-2">Docs</h2>
                <ul className="space-y-2">
                    {docs.map(({ slug, title }) => (
                        <li key={slug} className='w-full'>
                            <Link href={`/docs/${slug}`} className='px-2 py-1 hover:bg-white/10 rounded-lg w-full block'>
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex-grow px-16 py-8 overflow-y-auto">{children}</div>
        </div>
    );
}
