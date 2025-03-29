import Link from 'next/link';
import { getAllDocs } from '../../lib/markdown'; // Adjust the path if needed

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const docs = getAllDocs();

    return (
        <div className="flex">
            <nav className="w-48 p-4 border-r border-gray-300">
                <h2 className="text-lg font-bold mb-4">Docs</h2>
                <ul className="space-y-2">
                    {docs.map(({ slug, title }) => (
                        <li key={slug}>
                            <Link href={`/docs/${slug}`}>
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex-grow p-4">{children}</div>
        </div>
    );
}
