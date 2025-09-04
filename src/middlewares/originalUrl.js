const originalUrl = (request, response, next) => {
    console.log(`${request.originalUrl}`);
    next()
}

module.exports = originalUrl;