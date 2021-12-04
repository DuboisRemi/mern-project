process.env.NODE_ENV = "test";

const app = require("../server.js");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

//Create randomPseudos for the tests
var randomPseudo = (Math.random() + 1).toString(36).substring(7);

describe("Test post Workflow", () => {
  let userId;
  let postId;
  let cookie;

  const user = {
    pseudo: randomPseudo,
    email: randomPseudo + "@email.com",
    password: "pass123",
  };

  it("Should register a user and create a post then", (done) => {
    chai
      .request(app)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.not.null;
        userId = res.body.user;
        cookie = res.header["set-cookie"][0];
        chai
          .request(app)
          .post("/api/post/")
          .send({
            posterId: userId,
            message: "This is a test post",
          })
          .set("Cookie", cookie)
          .end((err, res) => {
            postId = res.body._id;
            expect(res.status).to.be.equal(200);
            done();
          });
      });
  });

  it("The user like this own post then unlike it ", (done) => {
    chai
      .request(app)
      .patch(`/api/post/like/${postId}`)
      .send({
        id: userId,
      })
      .set("Cookie", cookie)
      .end((err, res) => {
        expect(res.body._id).to.be.equal(postId);
        expect(res.body.likers).to.include(userId);
        expect(res.status).to.be.equal(201);
        chai
          .request(app)
          .patch(`/api/post/unlike/${postId}`)
          .send({
            id: userId,
          })
          .set("Cookie", cookie)
          .end((err, res) => {
            expect(res.status).to.be.equal(201);
            expect(res.body.likers).to.not.include(userId);
            expect(res.body._id).to.be.equal(postId);
            done();
          });
      });
  });
});
