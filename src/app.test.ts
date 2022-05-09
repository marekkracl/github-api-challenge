import { createServer, formatResult } from "./app";
import request from "supertest";

const app = createServer();

describe("Server Started", () => {
  describe("GET valid /:owner/:repo", () => {
    it("should return 200 with a valid owner/repo", (done) => {
      //const application = app;
      request(app).get("/marekkracl/github-api-challenge").expect(200, done);
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
