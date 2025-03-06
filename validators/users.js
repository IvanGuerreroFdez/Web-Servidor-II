const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator.js")

const validatorCreateItem = [
    check('name').exists().notEmpty().isString(),
    check('age').optional().isInt({ min: 0 }),
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({ min: 6 }),
    check('role').optional().isIn(['user', 'admin']),
    validateResults
];

module.exports = { validatorCreateItem }