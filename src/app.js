const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require('express-xss-sanitizer');
const httpStatus = require("http-status");

const config = require("./config/env.config");
const logger = require("./config/winston");
const routes = require("./routes/v1");
const publicRoutes = require("./routes/v1/public");
const { limiter } = require("./middlewares/limiter");
const connectDB = require("./config/connection");

const app = express();

let server;

connectDB()
  .then(() => {
    logger.info("Connected to MongoDB");
    server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => logger.info("MongoDB connection failed:", error.message));

// Graceful shutdown
const gracefulShutdown = () => {
  // Close the server and stop accepting new requests
  if (server) {
    server.close(() => {
      logger.info("Server closed.");
      process.exit(0); // Exit process
    });
  }
};

// Handle SIGTERM (e.g., from Kubernetes, Docker, or system termination)
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Handle SIGINT (e.g., Ctrl+C in terminal)
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions and unhandled rejections to prevent crashes
process.on("uncaughtException", () => gracefulShutdown());
process.on("unhandledRejection", () => gracefulShutdown());

// set security HTTP headers
app.use(helmet());

// parse json
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// compress all responses
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// apply the rate limiting middleware to all requests.
app.use(limiter);

// Testing api endpoint
app.get("/hello-world", (req, res) => {
  res.send("Hello, world!");
});

// v1 public routes
app.use('/v1/public', publicRoutes);

// v1 routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
 app.use((req, res, next) => {
   next(new Error(httpStatus.NOT_FOUND, 'Not found'));
 });