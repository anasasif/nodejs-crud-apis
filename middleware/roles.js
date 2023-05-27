module.exports = {

  isAdmin: (req, res, next) => {
    try {

      if (JSON.parse(req.userData.role).includes('admin')) {
        next();
      } else {
        return res.status(403).send('Access denied, you dont have admin permission');
      }

    } catch (error) {
      return res.status(400).json({ error: error });
    }
  },

  isDefault: (req, res, next) => {
    try {

      if (JSON.parse(req.userData.role).includes('default')) {
        next();
      } else {
        return res.status(403).send('Access denied, you dont have default permission');
      }

    } catch (error) {
      return res.status(400).json({ error: error });
    }
  },

  isSuperAdmin: (req, res, next) => {
    try {

      if (JSON.parse(req.userData.role).includes('superadmin')) {
        next();
      } else {
        return res.status(403).send('Access denied, you dont have superadmin permission');
      }

    } catch (error) {
      return res.status(400).json({ error: error });
    }
  },


};