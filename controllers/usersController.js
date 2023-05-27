
const { sequelize, User } = require('../models');
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");


// creating a new user
async function create(req, res) {
  try {

    const { name, email, password, role } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userData = { name: name, email: email, password: encryptedPassword, role: role }

    const finduser = await User.findOne({ where: { email: email } })

    if (finduser) {
      return res.status(400).json({ error: "User already exist" });
    } else {
      const createUser = await User.create(userData)
      if (createUser) {
        return res.status(201).json({
          success: "Created successfully!",
          resutl: createUser
        });
      } else {
        return res.status(400).json({ error: "An error occured!" });
      }
    }

  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}



// getting a user by ID
async function show(req, res) {
  try {

    const user = await User.findOne({ where: { id: req.params.id } })
    return res.status(200).json({ user: user });

  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}


// updating a user by ID
async function update(req, res) {
  try {

    const { name, email, password, role } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10);

    const updateData = { name: name, email: email, password: encryptedPassword, role: role }

      const userUpdate = await User.update(updateData, { where: { id: req.params.id } })
      if (userUpdate[0] === 1) {
        return res.status(201).json({ success: "Successfully updated" });
      } else {
        return res.status(400).json({ error: "something went wrong" });
      }

  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}


// deleting a user by ID
async function destroy(req, res) {
  try {

    const deleteUser = await User.destroy({ where: { id: req.params.id } })
    if (deleteUser) {
      return res.status(201).json({ success: "Successfully deleted" });
    } else {
      return res.status(400).json({ error: "something went wrong" });
    }

  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}


module.exports = {
  create: create,
  show: show,
  update: update,
  destroy: destroy
}