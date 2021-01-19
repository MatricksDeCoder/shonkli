const packageJSON   = require('../../package.json')
const sequelize     = require('../util/database')

// check a test route ([GET] ../dev/test)
exports.getTest = (req,res,next) => {
    console.log('getTest: [GET] /dev/test')
    res.status(200).json({message:'This is a test route! Its working!'})
}

// GET APP CONFIGURATIONS FROM package.json ([GET] ../dev/config)
exports.getConfig   = (req,res,next) => {
    console.log('getConfig: [GET] /dev/config')
    res.status(200).json({packageJSON})
}

// GET APP VERSION ([GET] ../dev/version)
exports.getVersion  = (req,res,next) => {
    console.log('getVersion: [GET] /dev/version')
    res.status(200).json({'npsd backend': packageJSON.version})
}