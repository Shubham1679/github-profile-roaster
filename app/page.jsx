// app/page.jsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!username.trim()) return;
    router.push(`/result/${username.trim()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* background glow blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-700 opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-20 rounded-full blur-3xl pointer-events-none" />

      {/* pill badge */}
      <div className="mb-6 px-4 py-1.5 bg-indigo-900 border border-indigo-700 rounded-full text-indigo-300 text-xs font-medium tracking-wide uppercase">
        Powered by GitHub API 🔥
      </div>

      {/* heading */}
      <h1 className="text-5xl sm:text-6xl font-bold text-white text-center leading-tight max-w-2xl">
        Roast your <span className="text-indigo-400">GitHub</span> profile
      </h1>

      {/* subheading */}
      <p className="mt-4 text-gray-400 text-center text-lg max-w-md">
        Enter any GitHub username and get a brutally honest roast based on their
        public stats. No feelings spared.
      </p>

      {/* input row */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 w-full gap-2 focus-within:border-indigo-500 transition-colors">
          <span className="text-gray-500 text-lg">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="github username"
            className="bg-transparent text-white placeholder-gray-600 outline-none text-base w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!username.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors w-full sm:w-auto whitespace-nowrap"
        >
          Roast me 🔥
        </button>
      </div>

      {/* example usernames */}
      <div className="mt-6 flex items-center gap-2 flex-wrap justify-center">
        <span className="text-gray-600 text-sm">Try:</span>
        {["torvalds", "gaearon", "octocat"].map((name) => (
          <button
            key={name}
            onClick={() => setUsername(name)}
            className="text-sm text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
          >
            @{name}
          </button>
        ))}
      </div>

      {/* footer */}
      <p className="absolute bottom-6 text-gray-700 text-xs">
        Built with Next.js · GitHub REST API · No feelings were considered
      </p>
    </main>
  );
}
