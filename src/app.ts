import express, { Application, Request, Response } from "express";
import { getPulls, getCommitCount } from "./api";

const app: Application = express();
const port: number = parseInt(process.env.PORT, 10) || 3000;

export function createServer() {
  app.get("/", async (req: Request, res: Response) => {
    // Get the owner and repo from the URL
    const { owner, repo } = req.query;

    if (
      !owner ||
      typeof owner !== "string" ||
      !repo ||
      typeof repo !== "string"
    ) {
      // If the owner or repo are not defined, return 400
      return res.status(400).send("Missing owner or repo");
    }

    // Define the results array
    let results: APIResult[] = [];

    // Get the pull requests from the API
    try {
      const { data: pulls } = await getPulls(owner, repo);

      // Get the commits for each pull request
      const mappedPulls = await Promise.all(
        pulls.map(async (pull) => {
          //format each PR into expected object
          let result = formatResult(pull);
          //asynchronously get commits for each PR and assign the result
          (await result).commit_count = await getCommitCount(
            owner,
            repo,
            pull.number
          );
          return result;
        })
      );

      results = mappedPulls;
    } catch (err) {
      // Log the error to the console
      console.error(err);
    } finally {
      // Send the results to the client
      return res.json(results);
    }
  });

  // If in a testing environment, doesn't set the port.  Kind of hacky, but avoids the "EADDRINUSE: address already in use" error
  if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }

  return app;
}

/**
 * Formats a pull request into expected result object
 * @param pull
 * @returns APIResult
 */
export function formatResult(pull: IGitHubResult): APIResult {
  return {
    id: pull.id,
    number: pull.number,
    title: pull.title,
    author: pull.user.login,
  };
}

createServer();
