import logger from './logger';

const createError = (message, statusCode = 500, stack = '') => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.stack = stack;
  return error;
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message, stack } = err;

  if (!statusCode) {
    statusCode = 500;
    message = 'Internal Server Error';
  }
  logger.error(`Error: \n${message}\n stack-trace: \n${stack}\n`);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: message,
    stack: stack,
  });
};

export default {
  createError,
  errorHandler,
};
