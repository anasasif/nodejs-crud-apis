const { sequelize, Post, User } = require('../models');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');


async function create(req, res) {
  try {

    const { email, password, role } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const payLaod = { email: email, password: encryptedPassword, role: role };

    const finduser = await User.findOne({ where: { email: req.body.email } })
    if (finduser) {
      return res.status(409).json({ error: 'Email already exist!' });
    } else {
      await User.create(payLaod).then(data => {
        return res.status(201).json({
          success: 'User has been created!',
          response: data
        });
      }).catch(err => {
        return res.status(400).json({ error: 'User could not be created!' });
      });
    }
  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}



module.exports = {
  create: create,
}