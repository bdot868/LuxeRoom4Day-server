const
  jwt = require('jsonwebtoken'),
  jwtSecret = process.env.JWT_SECRET || 'BOOMBOOMROOM'

const serverAuth = {
  createToken: function(data) {
    return jwt.sign(data, jwtSecret, {expiresIn: '1 day'})
  },

  verifyToken: function(token) {
    return jwt.verify(token, jwtSecret)
  },

  //middleware to use before responding to a request
  authorize: function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    //if no token, respond with status 403, unauthorized
    if(!token) return res.status(403).json({success: false, message: "Token is either invalid or not present."})

    const decoded = serverAuth.verifyToken(token)

    if(decoded) req.decoded = decoded

    next()
  }
}

module.exports = serverAuth;
