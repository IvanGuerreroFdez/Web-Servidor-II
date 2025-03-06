const { handleHttpError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJwt");
const usersModel = require("../models/users");

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NO_TOKEN", 401);
            return;
        }

        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await tokenSign(token);

        if (!dataToken_id) {
            handleHttpError(res, "INVALID_ID_TOKEN", 401);
            return;
        }

        const user = await usersModel.findById(dataToken._id);
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        handleHttpError(res, "ERROR_AUTH_MIDDLEWARE", 401);
    }
}

module.exports = authMiddleware;