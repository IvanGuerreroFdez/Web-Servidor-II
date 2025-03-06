const express = require("express");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const  usersModel  = require("../models/users");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { registerCtrl, loginCtrl } = require("../controllers/auth")
const { tokenSign } = require("../utils/handleJwt");

const router = express.Router();

router.post("/register", validatorRegister, async (req, res) => {
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
        res.status(500).send({ error: "Error en el registro de usuario" });
    }
});

//router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
