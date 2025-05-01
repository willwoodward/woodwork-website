export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          Woodwork<span className="text-blue-400">Engine</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
          A powerful framework for building and deploying AI agents using Infrastructure as Code.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            Get Started
          </button>
          <button className="rounded-md border border-gray-600 bg-gray-800 px-6 py-3 text-base font-medium text-gray-200 shadow-sm transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            Documentation
          </button>
        </div>
      </div>
    </main>
  );
}
