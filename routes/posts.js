const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')


router.get('/', postsController.index)
router.post('/', postsController.create)
router.get('/:id', postsController.show)
router.put('/:id', postsController.update)
router.delete('/:id', postsController.destroy)


module.exports = router;