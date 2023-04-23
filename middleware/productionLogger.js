const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const productionLogger = () => {
  return createLogger({
    level: 'info',
    format: combine(
      timestamp(),
      ecsFormat({ convertReqRes: true }),
      printf((info) => {
        const { level, message, timestamp, ...meta } = info;
        const reqMeta = meta.req ? meta.req.logMeta : {};
  
        return JSON.stringify({
          '@timestamp': timestamp,
          severity: level,
          message,
          ...reqMeta,
          ...meta,
        });
      }),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new DailyRotateFile({
        filename: './logs/user-service-%DATE%-info.log',
        datePattern: 'YYYY-MM-DD',
        level: 'info',
        maxFiles: '7d', // keep logs for the last 7 days
      }),
      new DailyRotateFile({
        filename: './logs/user-service-%DATE%-error.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxFiles: '7d', // keep logs for the last 7 days
      }),
      new transports.Console(),
    ],
  });
};

module.exports = productionLogger;
