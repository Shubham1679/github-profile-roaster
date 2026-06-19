// components/ProfileHeader.jsx

import Image from "next/image";
import Link from "next/link";

export default function ProfileHeader({ user }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6">
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={80}
        height={80}
        className="rounded-full object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {user.name || user.login}
        </h2>
        <p className="text-sm text-gray-500 mb-2">@{user.login}</p>
        {user.bio && <p className="text-sm text-gray-700">{user.bio}</p>}
        <Link
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:underline mt-2 inline-block"
        >
          View on GitHub →
        </Link>
      </div>
    </div>
  );
}
