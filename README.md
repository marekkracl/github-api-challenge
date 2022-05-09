# github-api-challenge

## Instructions to run locally

run `npm install`

ensure you are running Node 17.x - should work on previous versions of node, but was developed using 17

set the environment variable `TOKEN` to a valid GitHub PAT e.g. `TOKEN=ghp_111111111111111111111111111111111` to avoid rate limit of 60 queries/hour

Instructions for generating a PAT can be found here (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

run `npm test` to run the test suite

run `npm start` or `TOKEN=ghp_111111111111111111111111111111111 npm start` to run the server

Navigate to `localhost:3000/?owner=owner&repo=repo` in the browser to return a summary of the Pull Requests and commits for each in JSON format

http://localhost:3000/?owner=twbs&repo=bootstrap will access the repo used in the GitHub Docs