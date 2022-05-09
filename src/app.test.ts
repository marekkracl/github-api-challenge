import { createServer, formatResult } from "./app";
import request from "supertest";
import { getCommitCount, getPulls } from "./api";

const app = createServer();

describe("Server", () => {
  describe("GET valid /:owner/:repo", () => {
    it("should return 200 with a valid owner/repo", async () => {
      const response = await request(app).get("/?owner=owner&repo=repo");
      expect(response.statusCode).toBe(200);
    });

    it("should return a valid response with a valid owner/repo", async () => {
      const response = await request(app).get("/?owner=owner&repo=repo");
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });
  describe("GET INVALID /:owner/:repo", () => {
    it("should return 400 if owner is undefined", async () => {
      const response = await request(app).get("/?repo=marekkracl");
      expect(response.status).toBe(400);
    });

    it("should return 400 if repo is undefined", async () => {
      const response = await request(app).get("/?owner=github-api-challenge");
      expect(response.status).toBe(400);
    });

    it("should return an empty array otherwise", async () => {
      const response = await request(app).get("/?owner=owner&repo=repo");
      expect(JSON.parse(response.text)).toEqual([]);
    });
  });
});

describe("Unit Tests", () => {
  describe("formatResult", () => {
    it("should return a formatted object", () => {
      const result = {
        id: 1,
        number: 123,
        title: "test",
        user: {
          login: "testUser",
        },
      };
      const expected = {
        id: 1,
        number: 123,
        title: "test",
        author: "testUser",
      };
      expect(formatResult(result)).toEqual(expected);
    });
  });
});

describe("Integration Tests", () => {
  describe("getPulls", () => {
    it("should retrieve a known result from GitHub ([])", async () => {
      const { data: response } = await getPulls(
        "marekkracl",
        "github-api-challenge"
      );
      expect(response).toEqual(expect.arrayContaining([]));
    });
  });

  describe("getCommitCount", () => {
    it("should retrieve a known result from GitHub (14)", async () => {
      const response = await getCommitCount("twbs", "bootstrap", 28744);
      expect(response).toEqual(14);
    });
  });
});
