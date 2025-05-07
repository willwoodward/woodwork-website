"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [isLineHovered, setIsLineHovered] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isLineHovered) {
      // When line animation starts, set a timeout for when it should reach the button
      timeoutRef.current = setTimeout(() => {
        setIsButtonActive(true);
      }, 1200); // Slightly less than the 1.5s animation to ensure smooth transition
    } else {
      // When hover ends, immediately reset button state
      setIsButtonActive(false);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLineHovered]);

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
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl">
          <span className="text-white">Woodwork</span>
          <span style={{
            background: "linear-gradient(90deg, #57ADFF, #6F8FFE, #A95CFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>Engine</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
          A powerful framework for building and deploying AI agents using
          Infrastructure as Code.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/" className="rounded-md bg-[#57ADFF] px-6 py-3 text-base font-medium text-white shadow-md transition hover:bg-[#77CDFF] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900">
              Get Started
            </Link>
            <Link href="/docs" className="rounded-md border border-gray-600 bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900">
              Documentation
            </Link>
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
                    {`// main.ww
    model = llm openai {
      model = "gpt-4o"
      api_key = $OPENAI_API_KEY
    }
    
    endpoint = api web {
      url = "http://localhost:3000"
      documentation = "endpoint.txt"
    }
    
    in = input command_line {
      to: model
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
              <div
                className="absolute inset-0 rounded-lg translate-y-2 translate-z-0"
                style={{
                  transition: "background-color 1.5s ease-out",
                  backgroundColor: isButtonActive ? "#1e40af" : "#374151",
                }}
              ></div>

              {/* Main button body */}
              <div
                className="absolute inset-0 rounded-lg shadow-lg transform -translate-y-1"
                style={{
                  background:
                    "linear-gradient(to bottom right, #6b7280, #374151)",
                }}
              ></div>

              {/* Colored gradient (fades in/out) */}
              <div
                className="absolute inset-0 rounded-lg shadow-lg transform -translate-y-1"
                style={{
                  background:
                    "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
                  opacity: isButtonActive ? 1 : 0,
                  transition: "opacity 0.5s ease-out",
                }}
              ></div>

              {/* Side edge highlights */}
              <div
                className="absolute right-0 inset-y-0 w-1 rounded-r-lg"
                style={{
                  transition: "background-color 1.5s ease-out",
                  backgroundColor: isButtonActive
                    ? "rgba(216, 180, 254, 0.2)"
                    : "rgba(209, 213, 219, 0.2)",
                }}
              ></div>
              <div
                className="absolute bottom-0 inset-x-0 h-1 bg-blue-900/50 rounded-b-lg"
                style={{
                  transition: "background-color 1.5s ease-out",
                  backgroundColor: isButtonActive
                    ? "rgba(30, 58, 138, 0.5)"
                    : "rgba(75, 85, 99, 0.5)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-2 max-w-xs pt-8 pb-32">
        Turn your declarative code into powerful AI agents that adapt and learn.
      </p>

      
    </main>
  );
}
