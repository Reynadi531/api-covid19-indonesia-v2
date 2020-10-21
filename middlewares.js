const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    if(!process.env.NODE_ENV == 'production') {
        res.json({
            message: error.message,
            statusCode: statusCode,
            erorr: process.env.NODE_ENV === 'production' ? '🔥' : error.stack,
        });
    }else{
        res.json({
            message: error.message,
            statusCode: statusCode
        });
    }
};

module.exports = {
    notFound,
    errorHandler
};
