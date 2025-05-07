'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 p-4 h-16 text-black dark:text-white fixed top-0 left-0 w-full flex items-center shadow-sm z-10">
      <div className="text-lg font-bold px-4 absolute group">
        <img src="/woodwork-logo.png" alt="Woodwork Logo" className="h-10 w-10 inline-block mr-2" />
      </div>
      <ul className="flex space-x-8 mx-auto">
        <li>
          <Link href="/" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-100 transition-all">Home</Link>
        </li>
        <li>
          <Link href="/docs" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-100 transition-all">Docs</Link>
        </li>
      </ul>
    </nav>
  );
}
