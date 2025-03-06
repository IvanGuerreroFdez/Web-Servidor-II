const mongoose = require('mongoose')
//const mongooseDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(

    {
        name: String,
        age: Number,
        email: {
            type: String,
        },
        password: String,
        role: {
            type: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }

)

//TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" }) // Soft delete
module.exports = mongoose.model('users', UserScheme)