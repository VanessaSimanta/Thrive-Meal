const errorTypes = {
    INTERNAL_SERVER: {
      description: 'Internal server error occurred',
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
    },
    EXTERNAL: {
      description: 'External service error',
      status: 500,
      code: 'EXTERNAL_ERROR',
    },
    EMPTY_BODY: {
      description: 'Empty body is not allowed. Please fill the body',
      status: 400,
      code: 'EMPTY_BODY_ERROR',
    },
    VALIDATION: {
      description: 'Invalid request',
      status: 400,
      code: 'VALIDATION_ERROR',
    },
    INVALID_CREDENTIALS: {
      description: 'Invalid credentials',
      status: 403,
      code: 'INVALID_CREDENTIALS_ERROR',
    },
    INVALID_PASSWORD: {
      description: 'Invalid password',
      status: 403,
      code: 'INVALID_PASSWORD_ERROR',
    },
    TOKEN_EXPIRED: {
      description: 'Token expired',
      status: 419,
      code: 'TOKEN_EXPIRED_ERROR',
    },
    TOKEN_NOT_SIGNED: {
      description: 'Token not signed',
      status: 500,
      code: 'TOKEN_NOT_SIGNED_ERROR',
    },
    TOKEN_VERIFY: {
      description: 'Token verify error',
      status: 401,
      code: 'TOKEN_VERIFY_ERROR',
    },
    BAD_REFRESH_TOKEN: {
      description: 'Bad Refresh token',
      status: 401,
      code: 'BAD_REFRESH_TOKEN_ERROR',
    },
    ROUTE_NOT_FOUND: {
      description: 'Route not found',
      status: 404,
      code: 'ROUTE_NOT_FOUND_ERROR',
    },
    NOT_FOUND: {
      description: 'Empty response, not found',
      status: 404,
      code: 'NOT_FOUND_ERROR',
    },
    DB: {
      description: 'Database error occurred',
      status: 500,
      code: 'DB_ERROR',
    },
    BAD_REQUEST: {
      description: 'Bad request',
      status: 400,
      code: 'BAD_REQUEST_ERROR',
    },  
  };
  
  const errorResponder = (errorType, message = '') => {
    const error = new Error(message);
  
    if (errorType) {
      error.code = errorType.code || 'UNKNOWN_ERROR';
      error.status = errorType.status || 500;
      error.description = errorType.description || 'Unknown error occurred';
    }
  
    return error;
  };
  
  module.exports = {
    errorTypes,
    errorResponder,
  };
  