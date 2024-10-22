const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const env = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number(),
    MONGODB_URL: Joi.string().required().description('MongoDB URL'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_REFRESH_SECRET: Joi.string().required().description('JWT refresh secret key'),
    JWT_ACCESS_MINUTES: Joi.string().required().description('Number of minutes after which an access token expires'),
    JWT_REFRESH_DAYS: Joi.string().required().description('Number of days after which a refresh token expires'),
    JWT_RESET_PASSWORD_MINUTES: Joi.string().required().description('Number of minutes after which a reset password token expires'),
  })
  .unknown();

const { value: envVars, error } = env.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  jwt_secret: envVars.JWT_SECRET,
  jwt_refresh_secret: envVars.JWT_REFRESH_SECRET,
  jwt_access_minutes: envVars.JWT_ACCESS_MINUTES,
  jwt_refresh_days: envVars.JWT_REFRESH_DAYS,
  jwt_reset_password_minutes: envVars.JWT_RESET_PASSWORD_MINUTES,
};
