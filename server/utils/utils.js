const jwt              = require('jsonwebtoken')
const bcrypt           = require('bcryptjs')


// create JSON web token
// recommended to use long random secret stored in env as JWT_SECERT
// e.g generate using https://www.grc.com/passwords.htm
const createToken      = user => {
    if(!user.role) {
        throw new Error('User role not defined!')
    }
    //data with user info
    const payload      = {
        sub: user._id,
        emaill: user.email,
        role: user.role,
        issuer: 'api.shonkli',
        aud : 'api.shonkli'
    }

    const options       = {
        algorithm: 'HS256',
        expiresIn: '1h'
    }

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        options
    )
}

// hash passwords using bcrypt library
const hashPassword       = plainTextPassword => {
    return new Promise((resolve,reject) => {
        //generate salt at stengthe level 12 
        const saltRounds = 12
        bcrypt.genSalt(saltRounds, (err,salt) => {
            if(err) {
                reject(err)
            }
            bcrypt.hash(plainTextPassword, salt, (err, hash)  => {
                // Resolve hash
                if(err) {
                    reject(err)
                }
                resolve(hash)
            });
        })
    })
}

// very password using bcrypt library
const verifyPassword     = (plainTextPassword, hashedPassword) => bcrypt.compate(plainTextPassword, hashedPassword)

module.exports = {
    createToken,
    hashPassword,
    verifyPassword
}
  