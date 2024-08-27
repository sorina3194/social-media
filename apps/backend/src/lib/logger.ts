import ExpressWinston from 'express-winston';
import { WinstonModule, utilities } from 'nest-winston';
import winston from 'winston';

export const logger = WinstonModule.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
  ),
  transports: new winston.transports.Console({
    format: utilities.format.nestLike('hunt-api', { prettyPrint: true, colors: true }),
  }),
});

ExpressWinston.requestWhitelist.push('body');

export const requestLogger = ExpressWinston.logger({
  winstonInstance: logger as winston.Logger,
  baseMeta: { context: 'RequestLogger' },
  metaField: null,
  skip: (req) => req.method.toUpperCase() === 'OPTIONS',
  level: (req, res, error) => (error || res.statusCode >= 400 ? 'error' : 'info'),
});
