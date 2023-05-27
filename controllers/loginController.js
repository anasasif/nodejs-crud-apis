const { sequelize, Post, User } = require('../models');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./private.key', 'utf8');


async function login(req, res) {
  try {

    const finduser = await User.findOne({ where: { email: req.body.email } })
    if (finduser) {
      bcrypt.compare(req.body.password, finduser?.password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: finduser.email,
              id: finduser.id,
              role: finduser.role
            },
            privateKey, { issuer: 'innovation', expiresIn: '1h', algorithm: "RS256" }
          );
          await User.update({ last_login: `${new Date()}` }, { where: { id: finduser.id } })
          return res.status(200).json({
            success: 'Successfully loged in!',
            token,
            user: finduser,
          });
        } else {
          return res.status(400).json({ error: 'password incorrect!' });
        }
      })
    } else {
      return res.status(400).json({ error: 'User does not exist!' });
    }
  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}



module.exports = {
  login: login,
}