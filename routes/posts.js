const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')
const { isAdmin, isDefault, isSuperAdmin } = require('../middleware/roles');
 
router.get('/', [isDefault], postsController.index)
router.post('/', [isDefault], postsController.create)
router.get('/:id', [isAdmin], postsController.show)
router.put('/:id', [isAdmin], postsController.update)
router.delete('/:id', [isAdmin], postsController.destroy)


module.exports = router;