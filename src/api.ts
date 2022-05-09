import axios, { AxiosResponse } from "axios";

const token: string = process.env.TOKEN;

//sets token if one was passed, otherwise results will be rate-limited
const headers = { authorization: token ? ` token ${token}` : "" };

/**
 * Gets all open PRs for an owner and repo combination
 * @param owner
 * @param repo
 * @returns A Promise resolving to an array of GitHubResults sorted in ASC order - max 30
 */
async function getPulls(
  owner: string,
  repo: string
): Promise<AxiosResponse<IGitHubResult[]>> {
  return axios({
    url: `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&direction=asc`,
    headers,
  });
}

async function getCommitCount(
  owner: string,
  repo: string,
  number: number
): Promise<number> {
  const { data } = await axios({
    url: `https://api.github.com/repos/${owner}/${repo}/pulls/${number}/commits`,
    headers,
  });
  return data.length;
}

export { getPulls, getCommitCount };
