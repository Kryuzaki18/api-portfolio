const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");

const config = require("./config/env.config");
const logger = require("./config/winston");
const routes = require("./routes/v1");
const { authLimiter } = require("./middlewares/auth-limiter");
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
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0); // Exit process
  });
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

// parse json request body
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

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// v1 api routes
// app.use('/v1', routes);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new Error(httpStatus.NOT_FOUND, 'Not found'));
// });

module.exports = app;
