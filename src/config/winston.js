const winston = require('winston');
const config = require('./env.config');

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, simple, json } = format;

const devFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const buildLogger = () => {
  const isProduction = config.env === 'production';
  const logLevel = isProduction ? 'info' : 'debug';

  return createLogger({
    level: logLevel,
    format: combine(
      timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
      isProduction ? json() : combine(colorize(), devFormat)
    ),
    transports: [
      new transports.Console({
        format: isProduction ? format.simple() : combine(colorize(), simple()),
      }),
    ]
  });
};

const logger = buildLogger();

module.exports = logger;