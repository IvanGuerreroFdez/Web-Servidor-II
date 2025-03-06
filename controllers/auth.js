const { matchedData } = require("express-validator");
const  usersModel  = require("../models/users");
const { compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { model } = require("mongoose");

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);

        // Buscar usuario por email y traer campos relevantes
        const user = await usersModel.findOne({ email: req.email }).select("password name role email");

        if (!user) {
            return handleHttpError(res, "USER_NOT_EXISTS", 404);
        }

        // Comparar contraseñas
        const check = await compare(req.password, user.password);
        if (!check) {
            return handleHttpError(res, "INVALID_PASSWORD", 401);
        }

        // Ocultar la contraseña antes de devolver el usuario
        user.set("password", undefined, { strict: false });

        // Generar token
        const data = {
            token: await tokenSign(user),
            user
        };

        res.send(data);
    } catch (err) {
        console.error(err);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
};

/* const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);

        const password = await encrypt(req.password);
        const body = { ...req, password };
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        };

        res.send(data);
    } catch (error) {
        console.error(error);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
};

module.exports = { loginCtrl, registerCtrl }; */
module.exports = { loginCtrl };