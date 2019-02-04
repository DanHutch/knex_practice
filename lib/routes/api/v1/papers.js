const express = require('express');
const router = express.Router();
const papersController = require('../../../controllers/papers_controller')

router.get('/', papersController.index);
router.get('/:id/footnotes', papersController.footnotes)

module.exports = router
