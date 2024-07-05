import { logger } from '../logger/Logger';
export default function (req:any, res:any, next:any) {
  logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next();
}