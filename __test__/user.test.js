const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const User = require("../src/models/user.model");
const mongoose = require("mongoose");
const { beforeEach, afterEach } = require("@jest/globals");
const databaseName = "User_test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
  await User.create(User);
});
describe("POST /api/v1", () => {
  it("should save user in the database", async () => {
    const res = await request.post("/registerUser").send({
      firstName: "Mike",
      lastName: "lyon",
      phoneNumber: "08132378287",
      email: "sporty@gmail.com",
      password: "winner",
    });
    const user = await User.findOne({ email: "sporty@gmail.com" });
    expect(res.status).toBe(201);
    expect(user.firstName).toBeTruthy();
    expect(user.lastName).toBeTruthy();
    expect(user.phoneNumber).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(user.password).toBeTruthy();
  });

  describe("POST /api/v1", () => {
    it("should login a user", async () => {
      const res = await request.post("/loginUser").send({
        email: "sporty@gmail.com",
        password: "winner",
      });
      const user = await User.findOne({ email: "sporty@gmail.com" });
      expect(res.status).toBe(200);
      expect(user.email).toBeTruthy();
      expect(user.password).toBeTruthy();
    });
  });
});
afterEach(async () => {
  await User.deleteMany();
});
