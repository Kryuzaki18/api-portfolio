const jwt = require("jsonwebtoken");
const config = require("../config/env.config");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    config.jwt_secret,
    { expiresIn: config.jwt_access_minutes }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, config.jwt_refresh_secret, {
    expiresIn: config.jwt_refresh_days,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
