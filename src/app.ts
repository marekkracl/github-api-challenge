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
      return res.json(results);
  });
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
