const UserModel   = require('../models/user.model')
const jwtDecode   = require('jwt-decode')

// get util functions for hashing, creating tokens, verifying passwords
const {
    createToken,
    hashPassword,
    verifyPassword,
    pointsEarned
} = require('../utils/utils')

/* Point scoring system needs refactoring into a function and or middleware
const pointsEarned = {
  signup: 10,
  login : 2,
  updateBio: 3,
  twitterName: 5,
  createURL : 4,
  urlVisited: 1
}
*/


// SIGNUP NEW USER => ([POST] ../auth/signup)
exports.postSignup  = async (req,res) => {
    console.log('postSignup: [POST] /auth/signup')
    try {
        const { email, firstName, lastName, password } = req.body
        // hash the password to store in db
        const hashedPassword = await hashPassword(password)

        // create user object to store in database
        const userData = {
          email: email.toLowerCase(),
          firstName,
          lastName,
          password: hashedPassword,
        };
    
        const existingEmail = await UserModel.findOne({
          email: userData.email
        }).lean();
    
        if (existingEmail) {
          return res
            .status(400)
            .json({ message: 'Email already exists' })
        }
    
        const newUser   = new UserModel(userData)
        // give user points for registering
        newUser.points  = pointsEarned.signup
        const savedUser = await newUser.save()
    
        if (savedUser) {
          
          const { password, bio, ...rest } = savedUser._doc;
          const userInfo = Object.assign({}, { ...rest })

          const token = createToken(userInfo)
          const decodedToken = jwtDecode(token)
          const expiresAt = decodedToken.exp
    
          return res.json({
            message: 'User created!',
            token,
            userInfo,
            expiresAt
          });
        } else {
          return res.status(400).json({
            message: 'There was a problem creating your account'
          });
        }
      } catch (err) {
        return res.status(400).json({
          message: 'There was a problem creating your account'
        })
      }

}

// LOGIN A USER => ([POST] ../auth/login)
exports.postLogin  = async (req,res) => {
    console.log('postLogin: [POST] /auth/login')
    try {
        const { email, password } = req.body;
    
        const user = await UserModel.findOne({
          email
        }).lean()
    
        if (!user) {
          return res.status(403).json({
            message: 'Wrong email or password.'
          });
        }
    
        const passwordValid = await verifyPassword(
          password,
          user.password
        );
    
        if (passwordValid) {
          // give user points for login
          user.points += pointsEarned.login

          const { password, bio, ...rest } = user;
          const userInfo = Object.assign({}, { ...rest })
    
          const token = createToken(userInfo)
    
          const decodedToken = jwtDecode(token)
          const expiresAt = decodedToken.exp
    
          res.json({
            message: 'Authentication successful!',
            token,
            userInfo,
            expiresAt
          });
        } else {
          res.status(403).json({
            message: 'Wrong email or password.'
          })
        }
      } catch (err) {
        console.log(err)
        return res
          .status(400)
          .json({ message: 'Something went wrong.' })
      }

}


  