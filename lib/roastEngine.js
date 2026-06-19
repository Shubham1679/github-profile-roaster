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
const tooManyTodoRoasts = [
  (name) =>
    `${name} has built more todo apps than actual projects. The irony is noted.`,
  (name) => `${name}'s GitHub is basically a todo app museum. Very original.`,
];

const newUserRoasts = [
  (name) =>
    `${name} just joined GitHub. The journey of a thousand bugs begins with a single commit.`,
  (name) =>
    `${name} is fresh on GitHub. Welcome, the imposter syndrome hits around week two.`,
];

const veteranLowStarRoasts = [
  (name) =>
    `${name} has been on GitHub for years and still has almost no stars. Dedication to obscurity.`,
  (name) =>
    `${name} has been coding longer than some startups have existed and the internet hasn't noticed yet.`,
];

const noDescriptionRoasts = [
  (name) =>
    `${name} can't be bothered to describe their own repos. Mystery meat navigation.`,
  (name) =>
    `${name}'s repos have no descriptions. Even their code doesn't know what it does.`,
];

const genericRoasts = [
  (name) => `${name} seems to be doing just fine. Suspicious.`,
  (name) => `${name}'s profile is aggressively average. No notes.`,
  (name) => `${name} is the human equivalent of a default Bootstrap theme.`,
  (name) => `${name}'s GitHub gives off "it works on my machine" energy.`,
];

export function generateRoast(user, repos, totalStars) {
  const displayName = user.name || user.login;

  const yearsOnGithub = Math.floor(
    (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365),
  );
  const todoCount = repos.filter((r) =>
    r.name.toLowerCase().includes("todo"),
  ).length;
  const noDescriptionCount = repos.filter((r) => !r.description).length;

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

  if (todoCount >= 2) {
    roastPool.push(pickRoast(tooManyTodoRoasts, displayName));
  }

  if (yearsOnGithub === 0) {
    roastPool.push(pickRoast(newUserRoasts, displayName));
  }

  if (yearsOnGithub >= 5 && totalStars < 10) {
    roastPool.push(pickRoast(veteranLowStarRoasts, displayName));
  }

  if (noDescriptionCount >= 5) {
    roastPool.push(pickRoast(noDescriptionRoasts, displayName));
  }

  if (roastPool.length === 0) {
    roastPool.push(pickRoast(genericRoasts, displayName));
  }

  const randomIndex = Math.floor(Math.random() * roastPool.length);
  return roastPool[randomIndex];
}
