const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator.js")

const validatorCreateItem = [
    check('name').exists().notEmpty().isString().withMessage('El nombre de la pista es obligatorio'),
    check('album').exists().notEmpty().isString().withMessage('El álbum es obligatorio'),
    check('cover').exists().notEmpty().isURL().withMessage('La portada debe ser una URL válida'),
    check('artist.name').exists().notEmpty().isString().withMessage('El nombre del artista es obligatorio'),
    check('artist.nickname').exists().notEmpty().isString().withMessage('El apodo del artista es obligatorio'),
    check('artist.nationality').exists().notEmpty().isString().withMessage('La nacionalidad del artista es obligatoria'),
    check('duration.start').exists().notEmpty().isNumeric().withMessage('La duración de inicio debe ser un número'),
    check('duration.end').exists().notEmpty().isNumeric().withMessage('La duración de fin debe ser un número'),
    check('mediaId').exists().notEmpty().isMongoId().withMessage('El ID del medio debe ser un ObjectId válido de MongoDB'),
    validateResults
];

const validatorGetItem = [
    check('id').exists().notEmpty().isMongoId().withMessage('El ID de la pista debe ser un ObjectId válido de MongoDB'),
    validateResults
];
module.exports = { validatorCreateItem, validatorGetItem }
