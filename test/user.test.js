process.env.NODE_ENV = "test";

const app = require("../server.js");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

//Create a randomPseudo for the tests
var randomPseudo = (Math.random() + 1).toString(36).substring(7);
var randomPseudo2 = (Math.random() + 1).toString(36).substring(7);

console.log(randomPseudo);
console.log(randomPseudo2);

describe("User workflow test", () => {
  //we keep the user ids during the whole workflow
  let userId;
  let userId2;

  it("Should register a user", (done) => {
    //The new user

    const user = {
      pseudo: randomPseudo,
      email: randomPseudo + "@email.com",
      password: "pass123",
    };

    chai
      .request(app)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.not.null;
        userId = res.body.user;
        done();
      });
  });

  it("Sould get the user registered previously", (done) => {
    chai
      .request(app)
      .get(`/api/user/${userId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body.password).to.be.undefined;
        expect(res.body._id).to.be.equal(userId);
        done();
      });
  });
  it("Sould update the user's password registered previously", (done) => {
    chai
      .request(app)
      .put(`/api/user/${userId}`)
      .send({ password: "newpass123" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(200);
        expect(res.body.password).to.be.undefined;
        expect(res.body._id).to.be.equal(userId);
        done();
      });
  });
  it("Should create a new user who will follow the user registered previously", (done) => {
    const user2 = {
      pseudo: randomPseudo2,
      email: randomPseudo2 + "@email.com",
      password: "pass456",
    };

    //we register a new user
    chai
      .request(app)
      .post("/api/user/register")
      .send(user2)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.not.null;
        userId2 = res.body.user;

        // the new user follows the other one
        chai
          .request(app)
          .patch(`/api/user/follow/${userId2}`)
          .send({ idToFollow: userId })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.be.equal(201);

            //check if the new user is actually following the other one
            chai
              .request(app)
              .get(`/api/user/${userId}`)
              .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(200);
                expect(userId2).to.include(res.body.followers);
                done();
              });
          });
      });
  });
});
