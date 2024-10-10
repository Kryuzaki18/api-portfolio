const mongoose = require('mongoose');
const logger = require('./winston');
const config = require('./env.config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoose.url);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.info(`Error: ${err.message}`);
  }
};

module.exports = connectDB;