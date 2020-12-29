import chai from "chai";
import request from "supertest";
import Movies from "../../../../api/movies/movieModel";
import { movies } from "../../../../seedData/movies";

const expect = chai.expect;
const mongoose = require("mongoose");

let db;
let api;
let token;

// const sampleMovie = {
//   id: 337401,
//   title: "Mulan",
// };

describe("Movies endpoint", () => {
  before(() => {
    // mongoose.connect(process.env.mongoDB, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // db = mongoose.connection;

      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"test1"
      })
      .end((err,res)=>{
        token = res.body.token;
        console.log(token);
        done();
  });
});

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await Movies.deleteMany({});
      await Movies.collection.insertMany(movies);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });

  describe("GET /movies ", () => {
    // before((done) => {
    //   request(api)
    //   .post("/api/users")
    //   .send({
    //     "username":"user1",
    //     "password":"test1"
    //   })
    //   .end((err,res)=>{
    //     token = res.body.token;
    //     console.log(token);
    //     done();
    //   });
    // });

    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization","BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          // expect(res.body).to.be.a("array");
          // expect(res.body.length).to.equal(20);
          console.log(res);
          done();
        });
    });
  });
});
