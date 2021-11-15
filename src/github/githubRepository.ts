import Config from "../config.js";
import Secrets from "../secrets.js";
import fetch from "node-fetch";
import { PullRequestJson, RepoJson } from "./types.js";
import PullRequest from "./pullRequest.js";

export default class GithubRepository {
  constructor(
    private readonly _secrets: Secrets,
    private readonly _config: Config
  ) {
    // No body necessary
  }

  public get basicAuthHeader(): string {
    return `token ${this._secrets.accessToken}`;
  }

  private get orgEndpoint() {
    return `${this._config.apiBase}/orgs/${this._config.organization}`;
  }

  private get repoEndpoint() {
    return `${this.orgEndpoint}/repos`;
  }

  private prEndpoint(repo: string, number?: number) {
    return `${this._config.apiBase}/repos/${
      this._config.organization
    }/${repo}/pulls${number ? "/" + number : ""}?state=all`;
  }

  private async getRepos(): Promise<RepoJson[]> {
    return await this.getList(this.repoEndpoint);
  }

  public async getPullRequests(): Promise<PullRequest[]> {
    const pullRequests: PullRequest[] = [];
    const repos = await this.getRepos();
    for (const repo of repos) {
      var prList = await this.getList<PullRequestJson>(
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
    while (true) {
      const response = await fetch(
        url + (urlHasParams ? "&page=" : "?page=") + page,
        {
          method: "get",
          headers: {
            "Content-Type": "application/vnd.github.v3+json",
            Authorization: this.basicAuthHeader,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(
          `HTTP Error ${response.status}: ${response.statusText}`
        );
      }
      const jsonData = <Type[]>await response.json();
      if (jsonData.length === 0) {
        break;
      }
      list.push(...jsonData);
      page += 1;
    }
    return list;
  }
}
