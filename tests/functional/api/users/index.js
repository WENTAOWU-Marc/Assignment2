import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";

const expect = chai.expect;

let db;
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
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });


  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
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
    it("should return a 401 status with a simple password", (done) => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "WWT",
          password: "marc",
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.msg).to.equal("The password is too simple");
          done();
        });
    });
    it("should return a 201 status and create successfully", (done) => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.msg).to.equal("Successful created new user.");
          done();
        });
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(3);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2", "user3"]);
        });
    });
  });

  describe("GET / favourites", () => {
    it("should add movie to favourite", (done) => {
      request(api)
        .post("/api/users/user1/favourites")
        .send({
          "id": 590706
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.favourites.length).to.equal(1);
          done();
        })
    });

    it("should return a 401 status with err msg", (done) => {
      request(api)
        .post("/api/users/user1/favourites")
        .send({
          "id": 590706
        })
        .expect("Content-Type", /json/)
        .end(() => {
          request(api)
            .post("/api/users/user1/favourites")
            .send({
              "id": 590706
            })
            .expect("Content-Type", /json/)
            .expect(401)
            .end((err, res) => {
              expect(res.body.msg).to.equal("The movie has appeared");
              done();
            });
        });
    });

    it("should get favourite movie", (done) => {
      request(api)
        .post("/api/users/user1/favourites")
        .send({
          "id": 590706
        })
        .expect("Content-Type", /json/)
        .end(() => {
          request(api)
            .get("/api/users/user1/favourites")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body[0].id).to.equal(590706);
              done();
            })
        });
    });
  });

  describe("GET / watchlist", () => {
    it("should add upcomingmovie to watchlist", (done) => {
      request(api)
        .post("/api/users/user1/watchlist")
        .send({
          "id": 464052
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.watchList.length).to.equal(1);
          done();
        })
    });

    it("should return a 401 status with err msg", (done) => {
      request(api)
        .post("/api/users/user1/watchlist")
        .send({
          "id": 464052
        })
        .expect("Content-Type", /json/)
        .end(() => {
          request(api)
            .post("/api/users/user1/watchlist")
            .send({
              "id": 464052
            })
            .expect("Content-Type", /json/)
            .expect(401)
            .end((err, res) => {
              expect(res.body.msg).to.equal("The movie has appeared");
              done();
            })
        });
    });

    it("should get watchlist movie", (done) => {
      request(api)
        .post("/api/users/user1/watchlist")
        .send({
          "id": 464052
        })
        .expect("Content-Type", /json/)
        .end(() => {
          request(api)
            .get("/api/users/user1/watchlist")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body.length).to.equal(1);
              done();
            })
        });
    });

    it("should delete watchlist movie", (done) => {
      request(api)
        .post("/api/users/user1/watchlist")
        .send({
          "id": 464052
        })
        .expect("Content-Type", /json/)
        .end(() => {
          request(api)
            .delete("/api/users/user1/watchlist")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body.message).to.equal("success delete from watch list");
              done();
            })
        });
    });
  });
});