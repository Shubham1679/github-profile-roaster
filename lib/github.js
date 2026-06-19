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
