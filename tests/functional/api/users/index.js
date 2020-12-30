import chai from "chai";
import request from "supertest";
const expect = chai.expect;

let api;

const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

describe("Users endpoint", () => {
  beforeEach(function (done) {
    this.timeout(6000)
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    done();
  });

  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });

  describe("GET /users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    it("should return a 401 status with a simple password", () => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "WWT",
          password: "marc",
        })
        .expect(200)
        .end((err, res) => {
          console.log(res.body.msg);
          expect(res.body.msg).to.equal("The password is too simple");
        });
    });
    it("should return a 201 status and create successfully", () => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(401)
        .end((err,res) => {
          // console.log(res);
          expect(res.body.msg).to.equal("Successful created new user.");
        });
    });
      // after(() => {
      //   return request(api)
      //     .get("/api/users")
      //     .set("Accept", "application/json")
      //     .expect("Content-Type", /json/)
      //     .expect(200)
      //     .then((res) => {
      //       expect(res.body).to.be.a("array");
      //       expect(res.body.length).to.equal(3);
      //       let result = res.body.map((user) => user.username);
      //       expect(result).to.have.members(["user1", "user2", "user3"]);
      //     });
      // });
  });
});