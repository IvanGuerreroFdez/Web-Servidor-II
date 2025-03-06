const UserModel = require('../models/users.js')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')


const getItems = async (req, res) => {
    /*console.log(req);
    const data = await UserModel.find();
    res.json(data); */

    try{
        const user = req.user
        const data = await UserModel.find({})
        res.send(data, user)
    } catch(err){
       //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403) 
    }
}

const createItem = async (req, res) => {
    /* const data = await UserModel.create(req.body);
    res.json(data); */
    try {
        //console.log(req.body)
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        //console.log(body)
        const data = await UserModel.create(body)
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
       
}

const updateItem =  async (req, res) => {
    
    const email = req.params.email;
    const data = await UserModel.findOneAndReplace(
        {email}, 
        req.body, {returnDocument: 'after'});
    res.json(data)
}

const deleteItem = async (req, res) => {
    const data = await UserModel.findOneAndDelete({email: req.params.email})
    res.json(data)
}

const getItem = async ({req, res}) => {
    const data = await UserModel.findOne(
        {email});
    res.json(data)
}

module.exports = {getItem, getItems, updateItem, createItem, deleteItem}