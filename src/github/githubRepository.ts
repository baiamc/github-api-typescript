import fetch from "node-fetch";
import Config from "../config.js";
import Secrets from "../secrets.js";
import { PullRequestJson, RepoJson } from "./types.js";
import PullRequest from "./pullRequest.js";

/**
 * GithubRepository
 *
 * Class for accessing Github data
 */
export default class GithubRepository {
  constructor(
    private readonly _secrets: Secrets,
    private readonly _config: Config
  ) {
    // No body necessary
  }

  private apiHeaders() {
    return {
      "Content-Type": "application/vnd.github.v3+json",
      Authorization: `token ${this._secrets.accessToken}`,
    };
  }

  private orgEndpoint() {
    return `${this._config.apiBase}/orgs/${this._config.organization}`;
  }

  private repoEndpoint() {
    return `${this.orgEndpoint()}/repos`;
  }

  private prEndpoint(repo: string) {
    return `${this._config.apiBase}/repos/${this._config.organization}/${repo}/pulls?state=all`;
  }

  private async getRepos(): Promise<RepoJson[]> {
    return this.getList(this.repoEndpoint());
  }

  /**
   * Method to retrieve all pull requests for the configured organization
   * @returns Array of pull requests for the configured organization
   */
  public async getPullRequests(): Promise<PullRequest[]> {
    const pullRequests: PullRequest[] = [];
    const repos = await this.getRepos();
    for (const repo of repos) {
      let prList = await this.getList<PullRequestJson>(
        this.prEndpoint(repo.name)
      );
      for (const pr of prList) {
        pullRequests.push(new PullRequest(pr));
      }
    }
    return pullRequests;
  }

  private async getList<Type>(url: string): Promise<Type[]> {
    let page = 1;
    const list: Type[] = [];
    const urlHasParams = url.indexOf("?") > -1;
    // API only returns a subset of results, so keep grabbing more pages until we have it all
    while (true) {
      const response = await fetch(
        url + (urlHasParams ? "&page=" : "?page=") + page,
        {
          method: "get",
          headers: this.apiHeaders(),
        }
      );
      if (response.status !== 200) {
        throw new Error(
          `HTTP Error ${response.status}: ${response.statusText}`
        );
      }
      const jsonData = <Type[]>await response.json();
      // If no data is returned, then we've pulled all the pages
      if (jsonData.length === 0) {
        break;
      }
      list.push(...jsonData);
      page += 1;
    }
    return list;
  }
}
