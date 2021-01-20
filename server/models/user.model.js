const mongoose = require('mongoose')
const UrlModel = require('./url.model')

// user with list of their created url & slugs
const UserModel = mongoose.model('User', 

    mongoose.Schema({
        firstName: { 
            type: String, 
            required: true,
            trim:true
        },
        lastName: { 
            type: String, 
            required: true,
            trim:true
        },
        email: { 
            type: String, 
            required: true,
            trim:true
        },
        password: { 
            type: String, 
            required: true,
        },
        role: { 
            type: String, 
            required: false, 
            default: 'user' 
        },
        twitterName: { 
            type: String, 
            required: false,
            default: 'Zed_Developer'
        },
        bio: {
            type: String,
            required: false,
            default:'I love shonkli'
        },
        created: {
            type: Date,
            default: Date.now(),
        },
        urlsCount : {
            type: Number,
            default: 0
        },
        updated: {
            type: Date,
            required:false,
            default: Date.now()
        },
        points : {
            type: Number,
            default: 0,
            required: false
        }
    })
);

module.exports = UserModel
