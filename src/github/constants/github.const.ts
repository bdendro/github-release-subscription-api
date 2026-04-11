export const GITHUB_NAME = 'GitHub';

export const GITHUB_API_ENDPOINT = {
  getRepoEndpoint(repo: string) {
    return `/repos/${repo}`;
  },
  getRepoLastRelease(repo: string) {
    return `/repos/${repo}/releases/latest`;
  },
};
