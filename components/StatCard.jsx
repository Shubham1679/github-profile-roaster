// components/StatCard.jsx

export default function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 text-center min-w-[120px]">
      <p className="text-3xl font-semibold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
