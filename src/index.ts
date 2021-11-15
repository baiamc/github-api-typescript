import Config from "./config.js";
import GithubRepository from "./github/githubRepository.js";
import Secrets from "./secrets.js";

const secrets = await new Secrets().initialize();
const config = await new Config().initialize();
const repository = new GithubRepository(secrets, config);

const pullRequests = await repository.getPullRequests();
console.log(pullRequests);

console.log("Done");
