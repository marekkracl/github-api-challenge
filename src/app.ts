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
      res.status(400).send("Missing owner or repo");
      return;
    }
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
 * @returns Promise<APIResult>
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
