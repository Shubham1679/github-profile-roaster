// components/ShareButton.jsx

'use client'

export default function ShareButton() {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="text-sm text-center text-gray-600 hover:text-gray-400 transition-colors"
    >
      Copy link to share this roast 🔗
    </button>
  )
}