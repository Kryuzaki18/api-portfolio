const express = require("express");
const userValidation = require("../../../validations/user.validation");
const userController = require("../../../controllers/user.controller");
const validate = require("../../../middlewares/validate");

const router = express.Router();

router
  .route("/:userId")
  .get(validate(userValidation.getUser), userController.getUser);

module.exports = router;
