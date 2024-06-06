const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1]

  if (!token) return res.status(200).json({success: false, message: 'No token provided'})

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
    if (error) {
      return res.status(200).json({success: false, message: 'Fail to authentication'})
    }
    req.uid = decoded._id
  })
  next()
}

module.exports = checkAuth
