const express = require('express')
const {getItem, getItems, updateItem, createItem, deleteItem} = require ('../controllers/users.js')
const { validatorCreateItem } = require('../validators/users.js')
const customHeader = require("../middleware/customHeader")
const authMiddleware = require("../middleware/session.js")
const checkRol = require("../middleware/rol.js")

const userRouter = express.Router();

userRouter.get('/', getItems);
userRouter.get('/:email', getItem);
//userRouter.post('/', createItem);
userRouter.put('/:email', (req, res) => {
    console.log(req.params);
    updateItem(req, res);
});
userRouter.delete('/:email', deleteItem);
//userRouter.post("/", authMiddleware, validatorCreateItem, createItem)
//userRouter.post("/", authMiddleware, validatorCreateItem, customHeader, createItem)
userRouter.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)
userRouter.get("/", authMiddleware, getItems)

module.exports = userRouter;