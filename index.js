require('dotenv').config()
const path         = require("path")
const express      = require('express')
const mongoose     = require('mongoose')
const bodyParser   = require('body-parser')
const cors         = require('cors')
const helmet       = require('helmet')
const noCache      = require('nocache')
const logger       = require('morgan')

const app          = express()

// start all middleware....

//get our custom middleware functions
const {
  requireAdmin,
  requireAuth,
  attachUser,
  notFound404
} = require('./server/middleware/middleware');

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))

// use eg client in front end app
/app.use(express.static('client'));
// Serve static files from the React frontend app for production
app.use(express.static(path.join(__dirname, 'client/build')))

// helmet.noCache() no longer working
app.use(noCache());
// new way for helmet...
app.use(helmet());

/*security with helmet old way
app.use(helmet.hidePoweredBy({ setTo: 'PHP 1.1.0' }));
app.use(helmet.frameguard({action:'deny'}));
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
//content security policy with helmet
app.use(helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'","'unsafe-inline'", 'https://code.jquery.com'],
      styleSrc: ["'self'","'unsafe-inline'",'maxcdn.bootstrapcdn.com']
    }
  }));
*/

// get routes 
const devRouter    = require('./server/routes/dev.routes')
const urlRouter    = require('./server/routes/url.routes')
const authRouter   = require('./server/routes/auth.routes')
const inventoryRouter   = require('./server/routes/inventory.routes')
const usersRouter   = require('./server/routes/users.routes')
const dashBoardDataRouter = require('./server/routes/dashboardData.routes')

//  routes

app.use('/dev', devRouter)
app.use('/auth', authRouter)
// apply attachUser middlware to remaining routes
// app.use(attachUser)
app.use('/dashboard-data', dashBoardDataRouter)
app.use('/url', urlRouter)
app.use('/inventory',  inventoryRouter)
app.use('/users',  usersRouter)

// after all the routes apply 404 middleware
app.use(notFound404)

// ... end middleware 

const connect = async () => {

  // database connection
  const PORT         = process.env.PORT || 5000
  const MONGO_URL    = process.env.MONGO_URL
  const MONGO_CONFIG =  {    
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
  
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URL, MONGO_CONFIG);
    console.log('Successfully connected MongoDB!')
  } catch (err) {
    console.log('Mongoose error', err);
  }
  // start express server
  app.listen(PORT);
  console.log(`Server listening on localhost:${PORT}`);
}

connect();


