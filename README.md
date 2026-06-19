This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# GitHub Profile Roaster

Enter any GitHub username and get a personalized, slightly savage roast based on their public stats: repo count, followers, bio (or lack of one), commit history, and more.

## Features

Search any public GitHub username, view their profile alongside a generated roast and key stats, and share a direct link to a result page so others can see (and laugh at) their own roast.

## Tech stack

Next.js (App Router), the GitHub REST API for profile and repo data, and optionally an LLM API for more varied, dynamically generated roasts. Deployed on Vercel.

## Project structure

```
app/
├── page.jsx                  # Landing page: username input
└── result/
    └── [username]/
        ├── page.jsx           # Fetches data, generates roast, renders result
        └── loading.jsx        # Automatic loading state for this route
components/
├── ProfileCard.jsx           # Avatar, name, bio
├── StatCard.jsx               # One stat tile (repos, followers, etc.)
└── RoastCard.jsx              # The generated roast text
lib/
├── github.js                  # GitHub API calls
└── roastEngine.js              # Turns stats into a roast
```

## Getting started

```
git clone <your-repo-url>
cd github-profile-roaster
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | No | Raises the GitHub API rate limit from 60 to 5,000 requests/hour |
| `ANTHROPIC_API_KEY` | Only if using AI-generated roasts | Powers dynamic, LLM-written roasts instead of rule-based ones |

## How it works

A visitor enters a username on the home page and is routed to `/result/[username]`. That page reads the username from the URL, fetches the corresponding GitHub profile and repo data, runs it through the roast engine, and renders the profile card, stat cards, and roast card together.

## Deployment

Push to GitHub, then import the repository into Vercel. Add the same environment variables from `.env.local` to the project settings in Vercel, since `.env.local` is gitignored and won't be deployed automatically.

## Future improvements

Persisting and caching roasts so repeat visits don't re-hit the GitHub API, an "share as image" export using something like `html-to-image`, and a leaderboard of the most-roasted or funniest usernames.

## License

MIT