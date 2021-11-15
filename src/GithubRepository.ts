import Config from "./Config.js";
import Secrets from "./Secrets.js";
import fetch from "node-fetch";
import { IPullRequest, IRepo } from "./github/types.js";

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

  public async getRepos(): Promise<IRepo[]> {
    return await this.getList(this.repoEndpoint);
  }

  public async getPullRequests(): Promise<IPullRequest[]> {
    const pullRequests: IPullRequest[] = [];
    const repos = await this.getRepos();
    for (const repo of repos) {
      var prList = await this.getList<IPullRequest>(this.prEndpoint(repo.name));
      pullRequests.push.apply(pullRequests, prList);
    }
    return pullRequests;
  }

  private async getList<Type>(url: string): Promise<Type[]> {
    let page = 1;
    const list: Type[] = [];
    const urlHasParams = url.indexOf("?") > -1;
    while (true) {
      const data = await fetch(
        url + (urlHasParams ? "&page=" : "?page=") + page,
        {
          method: "get",
          headers: {
            "Content-Type": "application/vnd.github.v3+json",
            Authorization: this.basicAuthHeader,
          },
        }
      );
      const jsonData = <Type[]>await data.json();
      if (jsonData.length === 0) {
        break;
      }
      list.push.apply(list, jsonData);
      page += 1;
    }
    return list;
  }
}
