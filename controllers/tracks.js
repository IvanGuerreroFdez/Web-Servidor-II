const TracksModel  = require("../models/tracks");
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError');

const getItems = async (req, res) => {
    /* const data = await TracksModel.find({})
    res.send(data) */
    try{
        const user = req.user
        const data = await TracksModel.find({})
        res.send({data, user})
    } catch(err){
       //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403) 
    }
}

const getItem = (req, res) => {
    //const { id } = req.params;
    const { id } = matchedData(req)
    //const data = { id, name: "item" + id };
    const data = TracksModel.findById(id)
    res.send({ data });
};

const createItem = async (req, res) => {
    //const { body } = req
    //console.log(body)
    /* const data = await
    TracksModel.create(body)
    res.send(data) */
    try {
        //console.log(req.body)
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        //console.log(body)
        const data = await TracksModel.create(body)
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
};

const updateItem = async (req, res) => {
    /* const { id } = req.params;
    const { body } = req;
    const data = { id, ...body }; */
    const { id, ...body } = matchedData(req)
    const data = await TracksModel.findOneAndUpdate(id, body);
    res.send({ data });
};

const deleteItem = async (req, res) => {
    //const { id } = req.params;
    const { id } = matchedData(req)
    const data = await TracksModel.delete({ _id: id });
    res.send({ message: `Item ${id} deleted` });
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };