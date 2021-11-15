import fetch from "node-fetch";
import Config from "./config.js";
import GithubRepository from "./githubRepository.js";
import Secrets from "./secrets.js";

const body = { a: 1 };
const response = await fetch("https://httpbin.org/post", {
  method: "post",
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json" },
});

const secrets = await new Secrets().initialize();
const config = await new Config().initialize();
const repository = new GithubRepository(secrets, config);

const pullRequests = await repository.getPullRequests();
console.log(pullRequests);

console.log("Done");
