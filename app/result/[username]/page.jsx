// app/result/[username]/page.jsx

import { getGithubUser, getGithubRepos, getTotalStars, getMostUsedLanguage, getReposWithNoDescription, getTodoAppCount, getYearsOnGithub } from '@/lib/github'
import { generateRoast } from '@/lib/roastEngine'
import ProfileHeader from '@/components/ProfileHeader'
import StatCard from '@/components/StatCard'
import RoastCard from '@/components/RoastCard'
import ShareButton from '@/components/ShareButton'
import Link from 'next/link'

export default async function ResultPage({ params }) {
  const { username } = await params

  const user = await getGithubUser(username)

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <p className="text-5xl mb-4">😬</p>
        <h1 className="text-2xl font-bold text-white mb-2">User not found</h1>
        <p className="text-gray-400 mb-6">
          No GitHub account found for{' '}
          <span className="text-indigo-400">@{username}</span>
        </p>
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Try another username
        </Link>
      </main>
    )
  }

  const repos = await getGithubRepos(username)
  const totalStars = getTotalStars(repos)
  const mostUsedLanguage = getMostUsedLanguage(repos)
  const noDescriptionCount = getReposWithNoDescription(repos)
  const todoCount = getTodoAppCount(repos)
  const yearsOnGithub = getYearsOnGithub(user)
  const roast = generateRoast(user, repos, totalStars)

  const stats = [
    { label: 'Public Repos', value: user.public_repos },
    { label: 'Followers', value: user.followers },
    { label: 'Total Stars', value: totalStars },
    { label: 'Years on GitHub', value: yearsOnGithub },
    { label: 'Top Language', value: mostUsedLanguage },
    { label: 'No Description', value: noDescriptionCount },
    { label: 'Todo Apps', value: todoCount },
    { label: 'Following', value: user.following },
  ]

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

        {/* stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        {/* the roast */}
        <RoastCard roast={roast} />

        {/* share button */}
        <ShareButton />

      </div>
    </main>
  )
}