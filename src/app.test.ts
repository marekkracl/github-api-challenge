import createServer from "./app";
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
