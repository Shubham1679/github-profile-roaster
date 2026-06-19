// components/RoastCard.jsx

export default function RoastCard({ roast }) {
  return (
    <div className="bg-indigo-950 border border-indigo-800 rounded-2xl p-8 text-center">
      <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">
        Your Roast
      </p>
      <p className="text-white text-2xl font-semibold leading-relaxed">
        {roast}
      </p>
      <p className="text-indigo-400 text-3xl mt-6">🔥</p>
    </div>
  )
}