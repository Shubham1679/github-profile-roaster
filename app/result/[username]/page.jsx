// app/result/[username]/page.jsx

import { getGithubUser, getGithubRepos, getTotalStars } from "@/lib/github";
import { generateRoast } from "@/lib/roastEngine";
import ProfileHeader from "@/components/ProfileHeader";
import StatCard from "@/components/StatCard";
import RoastCard from "@/components/RoastCard";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";

export default async function ResultPage({ params }) {
  const { username } = await params;

  const user = await getGithubUser(username);

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <p className="text-5xl mb-4">😬</p>
        <h1 className="text-2xl font-bold text-white mb-2">User not found</h1>
        <p className="text-gray-400 mb-6">
          No GitHub account found for{" "}
          <span className="text-indigo-400">@{username}</span>
        </p>
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Try another username
        </Link>
      </main>
    );
  }

  const repos = await getGithubRepos(username);
  const totalStars = getTotalStars(repos);
  const roast = generateRoast(user, repos, totalStars);

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-700 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* back button */}
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-300 text-sm transition-colors w-fit"
        >
          ← Roast someone else
        </Link>

        {/* profile */}
        <ProfileHeader user={user} />

        {/* stats row */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Repos" value={user.public_repos} />
          <StatCard label="Followers" value={user.followers} />
          <StatCard label="Stars" value={totalStars} />
        </div>

        {/* the roast */}
        <RoastCard roast={roast} />

        {/* share button */}
        <ShareButton />
      </div>
    </main>
  );
}
