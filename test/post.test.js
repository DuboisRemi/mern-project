process.env.NODE_ENV = "test";

const app = require("../server");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const ObjectID = require("mongoose").Types.ObjectId;
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

  after(async () => {
    console.log("Stoping the server.........");
    app.stop();
  });
  it("Should register a user,  create a post and update id", (done) => {
    chai
      .request(app)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(err).to.be.null;
        expect(res.status).to.be.equal(201);
        expect(res.body.user).to.be.not.undefined;
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
            if (err) {
              console.log(err);
              done();
            }
            expect(res.status).to.be.equal(201);
            expect(res.body.message).to.be.equal("This is a test post");
            expect(ObjectID.isValid(postId)).to.be.true;
            chai
              .request(app)
              .patch(`/api/post/${postId}`)
              .send({ message: "Updated post" })
              .set("Cookie", cookie)
              .end((err, res) => {
                if (err) {
                  console.log(err);
                  done();
                }
                expect(res.status).to.be.equal(200);
                expect(res.body._id).to.be.equal(postId);
                expect(res.body.message).to.be.equal("Updated post");
                done();
              });
          });
      });
  });
  it("The user likes this own post then unlikes it ", (done) => {
    chai
      .request(app)
      .patch(`/api/post/like/${postId}`)
      .send({
        id: userId,
      })
      .set("Cookie", cookie)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body._id).to.be.equal(postId);
        expect(res.body.likers).to.include(userId);
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

  it("The user comments this own post", (done) => {
    chai
      .request(app)
      .patch(`/api/post/comment/${postId}`)
      .send({
        commenterId: userId,
        commenterPseudo: randomPseudo,
        text: "I comment my post",
      })
      .set("Cookie", cookie)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.be.equal(200);
        expect(res.body.comments.text).to.be.equal("I comment my post");
        done();
      });
  });

  it("Should delete the post created", (done) => {
    chai
      .request(app)
      .delete(`/api/post/${postId}`)
      .set("Cookie", cookie)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
