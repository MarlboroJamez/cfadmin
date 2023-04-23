const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');

const developmentLogger = () => {
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      ecsFormat({ convertReqRes: true }),
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(({ level, message, timestamp, req }) => {
        const reqInfo = req
          ? ` | url: ${req.originalUrl} | method: ${req.method} |`
          : '';

        return `${timestamp} [${level}]${reqInfo} ${message}`;
      })
    ),
    transports: [
      new winston.transports.File({ filename: './logs/dev-error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/dev-combined.log' }),
      new winston.transports.Console()
    ]
  });
};

module.exports = developmentLogger;
