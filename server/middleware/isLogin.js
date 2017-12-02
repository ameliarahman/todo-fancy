const jwt = require('jsonwebtoken')
require('dotenv').config()

function isLogin(req, res, next) {
  jwt.verify(req.headers.token, process.env.SECRET, function (err, result) {
    if (err) {
      res.send("Please login first")
    }
    if (result.isLogin) {
      req.headers.decoded = result
      next()
    }
  })
}



module.exports = isLogin