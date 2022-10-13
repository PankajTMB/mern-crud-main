/**
 * Get params from req.params and inject in req object
 */
module.exports = function (req, res, next) {
    for (let param of Object.keys(req.params)) {
        req[param] = req.params[param];
    }

    next();
}