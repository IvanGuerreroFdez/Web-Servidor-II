const express = require('express')
const {getItem, getItems, updateItem, createItem, deleteItem} = require ('../controllers/tracks.js')
const { validatorCreateItem } = require('../validators/tracks.js')
const customHeader = require("../middleware/customHeader")
const authMiddleware = require("../middleware/session.js")
const checkRol = require("../middleware/rol.js")

const trackRouter = express.Router();

trackRouter.get('/', getItems);
trackRouter.get('/:email', getItem);
//trackRouter.post('/', createItem);
trackRouter.put('/:email', (req, res) => {
    console.log(req.params);
    updateItem(req, res);
});
trackRouter.delete('/:email', deleteItem);
//trackRouter.post("/", authMiddleware, validatorCreateItem, createItem)
//trackRouter.post("/", authMiddleware, validatorCreateItem, customHeader, createItem)
trackRouter.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)
trackRouter.get("/", authMiddleware, getItems)

module.exports = trackRouter;