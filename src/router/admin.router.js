//  require dependencies
const express = require("express");
const router = express.Router();
const {
  createAdmin,
  adminLogin,
} = require("../controllers/admin.controller");
//  creating a route
router.post("/createAdmin", createAdmin);
router.post("/adminLogin", adminLogin);

//    exporting modules
module.exports = router;
