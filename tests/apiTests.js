const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("API Tests", () => {
  let token;

  // Login before running tests
  before((done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: "admin@example.com", password: "adminpassword" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // Test user creation
  it("should create a new user", (done) => {
    chai
      .request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password",
        isAdmin: false,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("User created successfully");
        done();
      });
  });

  // Test group creation
  it("should create a new group", (done) => {
    chai
      .request(app)
      .post("/api/groups")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Group", description: "This is a test group" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("Group created successfully");
        done();
      });
  });
});
