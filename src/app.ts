import axios, { AxiosResponse } from "axios";
import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = parseInt(process.env.PORT, 10) || 3000;
const token: string = process.env.TOKEN;

//sets token if one was passed, otherwise results will be rate-limited
const headers = { authorization: token ? ` token ${token}` : "" };

export function createServer() {
  app.get("/:owner/:repo", async (req: Request, res: Response) => {
    // Get the owner and repo from the URL
    const { owner, repo } = req.params;

    if (!owner || !repo) {
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
