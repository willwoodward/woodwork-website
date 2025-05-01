"use client";

import { useState } from "react";

export default function Home() {
  const [isLineHovered, setIsLineHovered] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-gray-900 to-black">
      <style jsx>{`
        @keyframes expandLine {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
      <div
        className="container mx-auto px-6 text-center flex flex-col items-center justify-center"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          Woodwork<span className="text-blue-400">Engine</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
          A powerful framework for building and deploying AI agents using
          Infrastructure as Code.
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

      <div className="w-full py-16"></div>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white">
            Define AI Agents with Code
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-400">
            Woodwork provides a declarative language to design, configure, and
            deploy AI agents effortlessly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Code Block */}
          <div className="w-full md:w-1/2">
            <div
              className="perspective-[1000px] w-full max-w-xl transform transition-all duration-300 ease-out hover:scale-105"
              id="code-plate"
              onMouseMove={(e) => {
                const el = document.getElementById("code-plate");
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
              }}
              onMouseLeave={() => {
                const el = document.getElementById("code-plate");
                if (!el) return;
                el.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg)";
              }}
              style={{
                willChange: "transform",
                transition: "transform 0.2s ease-out",
              }}
            >
              <div className="rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-0.5 shadow-xl">
                <pre className="overflow-x-auto rounded-lg bg-gray-900/70 p-4 text-left">
                  <code className="font-mono text-xs text-gray-100">
                    {`// agent.wood
    agent CustomerSupport {
      model: "gpt-4",
      temperature: 0.</div>7,
      
      knowledge: [
        "./docs/products.md",
        "./docs/policies.md"
      ],
      
      tools: [
        OrderDatabase,
        EmailService
      ],
      
      behavior: {
        friendly: true,
        proactive: true
      }
    }`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Connection line and right side - Agent Icon */}
          <div className="relative w-full flex items-center justify-start mb-4">
            {/* Connection line with animation */}
            <div
              className="hidden md:block absolute h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 w-full max-w-md -ml-8 left-0"
              style={{
                width: isLineHovered ? "100%" : "0%",
                maxWidth: "40rem",
                transition: "width 1.5s ease-out",
              }}
            ></div>

            {/* 3D Extruded Button */}
            <div
              className="relative w-28 h-28 mx-auto md:ml-[36rem] z-10"
              onMouseEnter={() => setIsLineHovered(true)}
              onMouseLeave={() => setIsLineHovered(false)}
            >
              {/* Outer shadow */}
              {/* Shadow/base layer */}
              <div className="absolute inset-0 bg-blue-800 rounded-lg translate-y-2 translate-z-0"></div>

              {/* Main button body */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg transform -translate-y-1">
                {/* Top surface with inner shadow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg border-t border-blue-300/30 flex items-center justify-center">
                  {/* AI Icon */}
                </div>

                {/* Side edge highlights */}
                <div className="absolute right-0 inset-y-0 w-1 bg-purple-300/20 rounded-r-lg"></div>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-900/50 rounded-b-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-2 max-w-xs pt-8">
          Turn your declarative code into powerful AI agents that adapt and
          learn.
        </p>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="rounded-lg bg-gray-800/50 p-6">
            <h3 className="mb-2 text-2xl font-bold text-blue-400">
              Declarative Configuration
            </h3>
            <p className="text-gray-300">
              Use our custom IaC language to define every aspect of your AI
              agents with clean, readable code.
            </p>
          </div>

          <div className="rounded-lg bg-gray-800/50 p-6">
            <h3 className="mb-2 text-2xl font-bold text-blue-400">
              Seamless Integration
            </h3>
            <p className="text-gray-300">
              Connect your agents to databases, APIs, and other tools with
              built-in connectors.
            </p>
          </div>

          <div className="rounded-lg bg-gray-800/50 p-6">
            <h3 className="mb-2 text-2xl fo</div>nt-bold text-blue-400">
              Version Control
            </h3>
            <p className="text-gray-300">
              Track changes, collaborate, and roll back to previous versions of
              your agents.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
