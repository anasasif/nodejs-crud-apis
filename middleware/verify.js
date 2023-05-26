const jwt = require("jsonwebtoken");
const fs = require('fs');
const publicKey = fs.readFileSync('./public.key', 'utf8');

module.exports = {

  isUserValid: (req, res, next) => {
    try {
      
      if (req.headers['x-user-id']) {
        req.user_id = req.headers['x-user-id'];
        req.user_role = req.headers['x-user-role'];
        next();
      } else {
        return res.status(400).send({
          error: 'User id required',
        });
      }
      
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  },

  isTokenValid: (req, res, next) => {
    const token = req.headers['x-authorization']
    if (token) {
      try {
        const tokenb = token?.split(' ')[1];
        const decoded = jwt?.verify(token, publicKey, { issuer: 'innovation', expiresIn: '1h', algorithm: ["RS256"] });
        req.userData = decoded;
        next();
      } catch (err) {
        return res.status(400).send({
          error: 'Token is invalid',
        });
      }
    } else {
      return res.status(400).send({
        error: 'Token required',
      });
    }
  },

};