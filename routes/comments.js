const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController')


 
router.post('/:id', commentsController.create)
router.get('/:id', commentsController.index)


module.exports = router;