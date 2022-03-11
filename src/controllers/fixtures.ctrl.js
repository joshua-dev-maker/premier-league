const Fixtures = require("../models/fixtures.model");

const CreateFixtures = async (req, res, next) => {
  try {
    const { stadium, id, homeTeam, date, status } = req.body;
    if (!stadium || !id || !homeTeam || !date)
      return res.status(400).json({
        message: "fill in required fields",
      });
    const CreateFixtures = await Fixtures.create({
      stadium,
      teams: id,
      homeTeam,
      date,
      status,
    });
    return res.status(201).json({
      message: "fixtures created successfully",
      CreateFixtures,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const editFixtures = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const editFixtures = await Fixtures.findOneAndUpdate({ _id }, req.body, {
      new: true,
    })
      .find()
      .populate("teams", {
        teamName: 1,
        _id: 0,
      });
    return res.status(200).json({
      message: "fixtures updated successfully",
      editFixtures,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const viewFixtures = async (req, res, next) => {
  try {
    const viewFixture = await Fixtures.find().populate("teams", {
      teamName: 1,
      _id: 0,
    });
    // console.log(viewFixture[0].teams)
    const viewAllFixtures = [];
    for (fixture of viewFixture) {
      if (fixture) {
        const [team1, team2] = fixture.teams;
        const home_Team = team1.teamName;
        const away_Team = team2.teamName;
        // console.log(home_Team);
        // console.log(away_Team);
        const newFixture = `${home_Team} vs ${away_Team}`;
        viewAllFixtures.push(newFixture);
      }
    }
    // console.log(viewAllFixtures);
    return res.status(200).json({
      viewAllFixtures,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const removeFixtures = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const removeFixtures = await Fixtures.find({ _id });
    return res.status(200).json({
      message: "fixtures deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const completedFixtures = async (req, res, next) => {
  try {
    const completedFixts = [];
    const allCompletedFixs = await Fixtures.find().populate("teams", {
      teamName: 1,
      _id: 0,
    });
    console.log(allCompletedFixs);
    for (allCompletedFix of allCompletedFixs) {
      if (allCompletedFix.status === "completed") {
        completedFixts.push(allCompletedFix);
      }
    }

    const viewCompletedFixtures = [];
    for (fixture of completedFixts) {
      if (fixture) {
        const [team1, team2] = fixture.teams;
        const home_Team = team1.teamName;
        const away_Team = team2.teamName;
        // console.log(home_Team);
        // console.log(away_Team);
        const newFixture = `${home_Team} vs ${away_Team}`;
        viewCompletedFixtures.push(newFixture);
      }
    }
    console.log(viewCompletedFixtures);
    return res.status(200).json({
      viewCompletedFixtures,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error...
          ${error.message}`,
    });
  }
};

const pendingFixtures = async (req, res, next) => {
  try {
    const pendingFixts = [];
    const allPendingFixs = await Fixtures.find().populate("teams", {
      teamName: 1,
      _id: 0,
    });
    for (pendingFix of allPendingFixs) {
      if (pendingFix.status === "pending") {
        pendingFixts.push(pendingFix);
      }
    }
    const viewPendingFixtures = [];
    for (fixture of pendingFixts) {
      if (fixture) {
        const [team1, team2] = fixture.teams;
        const home_Team = team1.teamName;
        const away_Team = team2.teamName;
        const newFixture = `${home_Team} vs ${away_Team}`;
        viewPendingFixtures.push(newFixture);
      }
    }
    return res.status(200).json({
      viewPendingFixtures,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error...
          ${error.message}`,
    });
  }
};

module.exports = {
  CreateFixtures,
  editFixtures,
  viewFixtures,
  removeFixtures,
  completedFixtures,
  pendingFixtures,
};
