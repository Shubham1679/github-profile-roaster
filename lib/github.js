// // lib/github.js

// export async function getGithubUser(username) {
//   try {
//     const response = await fetch(`https://api.github.com/users/${username}`);
//     if (!response.ok) return null;
//     return response.json();
//   } catch (error) {
//     console.error("GitHub user fetch failed:", error.message);
//     return null;
//   }
// }

// export async function getGithubRepos(username) {
//   try {
//     const response = await fetch(
//       `https://api.github.com/users/${username}/repos`,
//     );
//     if (!response.ok) return [];
//     return response.json();
//   } catch (error) {
//     console.error("GitHub repos fetch failed:", error.message);
//     return [];
//   }
// }

// export function getTotalStars(repos) {
//   return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
// }

// lib/github.js

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export async function getGithubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("GitHub user fetch failed:", error.message);
    return null;
  }
}

export async function getGithubRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      { headers },
    );
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error("GitHub repos fetch failed:", error.message);
    return [];
  }
}

export function getTotalStars(repos) {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

// Most used language across all repos
export function getMostUsedLanguage(repos) {
  const count = {};
  for (const repo of repos) {
    if (repo.language) {
      count[repo.language] = (count[repo.language] || 0) + 1;
    }
  }
  if (Object.keys(count).length === 0) return "None";
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

// Repos with no description
export function getReposWithNoDescription(repos) {
  return repos.filter((repo) => !repo.description).length;
}

// Todo app count (repos named something with "todo")
export function getTodoAppCount(repos) {
  return repos.filter((repo) => repo.name.toLowerCase().includes("todo"))
    .length;
}

// Years on GitHub
export function getYearsOnGithub(user) {
  const created = new Date(user.created_at);
  const now = new Date();
  return Math.floor((now - created) / (1000 * 60 * 60 * 24 * 365));
}
