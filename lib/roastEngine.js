function pickRoast(options, name) {
  const index = Math.floor(Math.random() * options.length);
  return options[index](name);
}

const zeroRepoRoasts = [
  (name) => `${name} has zero public repos. Bold strategy.`,
  (name) => `${name}'s GitHub is emptier than a Monday morning standup.`,
  (name) => `${name} joined GitHub just to window shop, apparently.`,
];

const noBioRoasts = [
  (name) => `${name} couldn't even write a bio. Mysterious, or just lazy?`,
  (name) => `${name}'s bio is blank. Even a 404 page has more to say.`,
  (name) => `${name} left the bio empty, the README of their own life.`,
];

const highRepoLowStarRoasts = [
  (name) =>
    `${name} has dozens of repos and almost no stars. Quantity over quality, clearly.`,
  (name) => `${name} forks more than they build, judging by that repo count.`,
  (name) => `${name}'s repos are basically a graveyard nobody visits.`,
];

const lowFollowerRoasts = [
  (name) =>
    `${name} has fewer than 10 followers. Even their mom hasn't followed back.`,
  (name) => `${name}'s follower count rounds to zero on most charts.`,
  (name) => `${name} is basically coding in a group chat with no members.`,
];

const popularRoasts = [
  (name) =>
    `${name} has more followers than some small towns have residents. Show-off.`,
  (name) =>
    `${name}'s follower count suggests they peaked a while ago and are still coasting on it.`,
];

const noLocationRoasts = [
  (name) => `${name} hasn't listed a location. Witness protection?`,
  (name) =>
    `${name} keeps their location a secret. Probably coding from a bunker.`,
];

const genericRoasts = [
  (name) => `${name} seems to be doing just fine. Suspicious.`,
  (name) => `${name}'s profile is aggressively average. No notes.`,
  (name) => `${name} is the human equivalent of a default Bootstrap theme.`,
  (name) => `${name}'s GitHub gives off "it works on my machine" energy.`,
];

export function generateRoast(user, repos, totalStars) {
  const displayName = user.name || user.login;

  const roastPool = [];

  if (repos.length === 0) {
    roastPool.push(pickRoast(zeroRepoRoasts, displayName));
  }

  if (!user.bio) {
    roastPool.push(pickRoast(noBioRoasts, displayName));
  }

  if (repos.length > 20 && totalStars < 5) {
    roastPool.push(pickRoast(highRepoLowStarRoasts, displayName));
  }

  if (user.followers < 10) {
    roastPool.push(pickRoast(lowFollowerRoasts, displayName));
  }

  if (user.followers > 1000) {
    roastPool.push(pickRoast(popularRoasts, displayName));
  }

  if (!user.location) {
    roastPool.push(pickRoast(noLocationRoasts, displayName));
  }

  if (roastPool.length === 0) {
    roastPool.push(pickRoast(genericRoasts, displayName));
  }

  // Return one random roast from all matched roasts
  const randomIndex = Math.floor(Math.random() * roastPool.length);
  return roastPool[randomIndex];
}
