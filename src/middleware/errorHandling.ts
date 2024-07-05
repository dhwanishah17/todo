import { ErrorType } from '../utils/errorTypes';
import { logger } from '../logger/Logger';

function generateErrorResponse(err:any, status:any, res:any) {
  const errObj = { status: status, message: err.message };
  return res.status(status).send(errObj);
}

function generateAndSendAppErrorResponse(err:any, res:any, req:any) {
  switch (err.reason) {
    case ErrorType.invalid_request:
      logger.error(`400 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return generateErrorResponse(err, 400, res);

    case ErrorType.not_found:
      logger.error(`404 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return generateErrorResponse(err, 404, res);

    case ErrorType.Forbidden:
      logger.error(`403 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return generateErrorResponse(err, 403, res);

    case ErrorType.unauthorized:
      logger.error(`401 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return generateErrorResponse(err, 401, res);

    case ErrorType.conflict:
      logger.error(`409 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return generateErrorResponse(err, 409, res);

    case ErrorType.validation_error:
      logger.error(`400 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return generateErrorResponse(err, 400, res);

    case ErrorType.unknown_error:
      break;
    default:
      logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      // err.message = i18n.__('common').internalServerError;
      return generateErrorResponse(err, 500, res);
  }
}
export default function ({err, req, res, next}:any) {

  // Do something more with the error here...
  return generateAndSendAppErrorResponse(err, res, req);
  next(err);
};