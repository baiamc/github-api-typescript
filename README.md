# GitHub API Project

## Access Token

This project expects a file named secrets.json to be in the directory above the repository. 
For example if the project is checked out to `/c/git/project` then the file should be located 
at `/c/git/secrets.json` and contain a single property that contains a personal access token 
for github. This is used by the API to bypass rate limiting and does not need any extra permissions.

File format:

```
{
  "accessToken": "<insert token here>"
}
```
