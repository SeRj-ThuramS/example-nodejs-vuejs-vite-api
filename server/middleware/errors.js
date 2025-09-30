export const middlewareHTTPError404Next = (req, res, next) => {
    if (!req.route) {
        const error = new Error('Not Found');
        error.status = 404;

        return next(error);
    }
    next();
}

export const middlewareHTTPError = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    // console.error(`Error: ${statusCode} - ${message}`);

    res.status(statusCode).json({
        code: statusCode,
        errMsg: message
    });
}