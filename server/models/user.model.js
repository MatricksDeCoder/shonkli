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
            required: true, 
            default: 'user' 
        },
        twitterName: { 
            type: String, 
            required: false 
        },
        bio: {
            type: String,
            required: false
        },
        created: {
            type: Date,
            default: Date.now(),
        },
        urlsCount : {
            type: Number,
            default: 0
        },
        updated: Date,
    })
);

module.exports = UserModel
