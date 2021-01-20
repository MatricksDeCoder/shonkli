const jwt                = require('express-jwt')
const jwtDecode          = require('jwt-decode');
// various middlewares for some routes or all routes via app.use(definedMiddleware)

// require only admin authorized
const requireAdmin       = (req,res,next) => {
    if(!req.user) {
        return res.status(401).json({message: 'There was a problem authorizing request'})
    }
    if (req.user.role !== 'admin') {
        return res.status(401).json({message: 'Insufficient role'})
    }
    next()
}

// require authentication JWT for a route
// extract JWT Authorization header 
const requireAuth        = jwt({
    secret: process.env.JWT_SECRET,
    audience: 'api.shonkli',
    issuer: 'api.shonkli',
    algorithms: ['HS256']
  })

// attach user to req on way to route processing
const attachUser = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authentication invalid' })
    }

    const decodedToken = jwtDecode(token.slice(7))
  
    if (!decodedToken) {
      return res.status(401).json({
        message: 'There was a problem authorizing the request'
      })
    } else {
      req.user = decodedToken
      next()
    }
  }

  // 404 Not Found Middleware

const notFound404      = (req, res, next) => {
    
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    return res.type('txt').send('Not found');
}


module.exports = {
      requireAdmin,
      requireAuth,
      attachUser,
      notFound404
  }

