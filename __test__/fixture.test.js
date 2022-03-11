const { app } = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);
const Fixtures = require("../src/models/fixtures.model");
const mongoose = require("mongoose");
const { beforeEach, afterEach } = require("@jest/globals");
const databaseName = "Fixtures_test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
  await Fixtures.create(Fixtures);
});
describe("fixtures /api/v1", () => {
  it("should save fixture in the database", async () => {
    const res = await request.post("/createFixture").send({
      stadium: "emirates",
      id: ["ertyyu", "ifghjk"],
      homeTeam: "arsenal",
      date: "2022-03-29",
    });
    const fixture = await Fixtures.findOne({ homeTeam: "arsenal" });
    expect(res.status).toBe(201);
    expect(fixture.stadium).toBeTruthy();
    expect(fixture.teams).toBeTruthy();
    expect(fixture.homeTeam).toBeTruthy();
    expect(fixture.date).toBeTruthy();
  });
  describe("Getfixtures/api/v1", () => {
    it("should GET all users details", async () => {
      const res = await request.get("/getfixtures");
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Getfixtures");
    });
  });
});
afterEach(async () => {
  await Fixtures.deleteMany();
});
