const { app } = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const Admin = require("../src/models/admin.model");
const mongoose = require("mongoose");
const { beforeEach, afterEach } = require("@jest/globals");
const databaseName = "testing_admin";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
  await Admin.create(Admin);
});
describe("POST /api/v1", () => {
  it("should create admin in the database", async () => {
    const res = await request.post("/registerAdmin").send({
      firstName: "Jossy",
      lastName: "dev",
      phoneNumber: "0998087765",
      email: "admin@gmail.com",
      password: "enoeasy",
    });
    const admin = await Admin.findOne({ email: "admin@gmail.com" });
    expect(res.status).toBe(201);
    expect(admin.firstName).toBeTruthy();
    expect(admin.lastName).toBeTruthy();
    expect(admin.phoneNumber).toBeTruthy();
    expect(admin.email).toBeTruthy();
    expect(admin.password).toBeTruthy();
  });
});

describe("POST /api/v1", () => {
  it("should login an admin", async () => {
    const res = await request.post("/loginAdmin").send({
      email: "admindey@gmail.com",
      password: "unique",
    });
    const admin = await Admin.findOne({ email: "admindey@gmail.com" });
    expect(res.status).toBe(200);
    expect(admin.email).toBeTruthy();
    expect(admin.password).toBeTruthy();
  });
});
afterEach(async () => {
  await User.deleteMany();
});
