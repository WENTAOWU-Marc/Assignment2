import chai from "chai";
import request from "supertest";

const expect = chai.expect;

let token;
let api;

const nowplayingMovie = {
    id: 464052,
    title: "Wonder Woman 1984"
};

describe("Nowplaying movies endpoint", () => {
    beforeEach(function (done) {
        this.timeout(6000)
        try {
            api = require("../../../../index");
        } catch (err) {
            console.error(`failed to Load user Data: ${err}`);
        }
        setTimeout(() => {
            request(api)
                .post("/api/users")
                .send({
                    "username": "user1",
                    "password": "test1"
                })
                .end((err, res) => {
                    token = res.body.token;
                    done();
                });
        }, 4000)
    });

    afterEach(() => {
        api.close(); // Release PORT 8080
        delete require.cache[require.resolve("../../../../index")];
    });

    describe("GET /nowplayingMovies ", () => {
        it("should return 20 nowplayingmovies and a status 200", (done) => {
            request(api)
                .get(`/api/nowplayingMovies`)
                .set("Accept", "application/json")
                .set("Authorization", token)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    console.log(res.body);
                    expect(res.body.length).to.equal(20);
                    done();
                });
        });
    });

    describe("GET /nowplayingMovies/:id", () => {
        describe("when the id is valid", () => {
            it("should return the matching movie", () => {
                return request(api)
                    .get(`/api/nowplayingMovies/${nowplayingMovie.id}`)
                    .set("Accept", "application/json")
                    .set("Authorization", token)
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((res) => {
                        expect(res.body).to.have.property("title", nowplayingMovie.title);
                    });
            });
        });
        describe("when the id is invalid", () => {
            it("should return the NOT found message", () => {
                return request(api)
                    .get("/api/nowplayingMovies/100")
                    .set("Accept", "application/json")
                    .set("Authorization", token)
                    .expect('')
            });
        });
    });
});