const express = require('express')
const {getItem, getItems, updateItem, createItem, deleteItem} = require ('../controllers/tracks.js')
const { validatorCreateItem } = require('../validators/tracks.js')
const customHeader = require("../middleware/customHeader")

const trackRouter = express.Router();

trackRouter.get('/', getItems);
trackRouter.get('/:email', getItem);
//trackRouter.post('/', createItem);
trackRouter.put('/:email', (req, res) => {
    console.log(req.params);
    updateItem(req, res);
});
trackRouter.delete('/:email', deleteItem);
//trackRouter.post("/", validatorCreateItem, createItem)
trackRouter.post("/", validatorCreateItem, customHeader, createItem)

module.exports = trackRouter;