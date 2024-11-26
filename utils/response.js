module.exports = {
    success: (res, message, data = null, statusCode = 200) => {
        res.status(statusCode).json({
            status: 'success',
            message,
            data,
        });
    },

    error: (res, message, statusCode = 500) => {
        res.status(statusCode).json({
            status: 'error',
            message,
        });
    },

    validationError: (res, message, errors = null, statusCode = 400) => {
        res.status(statusCode).json({
            status: 'validation_error',
            message,
            errors,
        });
    },
};
