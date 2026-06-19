// components/ShareButton.jsx

"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400 transition-all text-sm font-medium"
    >
      {copied
        ? "✅ Link copied! Share the roast"
        : "🔗 Copy link to share this roast"}
    </button>
  );
}
