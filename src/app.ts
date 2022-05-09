import express from "express";
const app = express();
import axios, { AxiosResponse } from "axios";
import express, { Application, Request, Response } from "express";

app.get("/", (req, res) => {
  res.json("Hello World!");
});
const app: Application = express();
const port: number = parseInt(process.env.PORT, 10) || 3000;
const token: string = process.env.TOKEN;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
//sets token if one was passed, otherwise results will be rate-limited
const headers = { authorization: token ? ` token ${token}` : "" };

export default function createServer() {
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
createServer();
