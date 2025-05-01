'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 h-16 text-white fixed top-0 left-0 w-full flex items-center justify-center">
      <div className="text-lg font-bold absolute left-4">woodwork-engine</div>
      <ul className="flex space-x-8">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/docs">Docs</Link>
        </li>
      </ul>
    </nav>
  );
}
