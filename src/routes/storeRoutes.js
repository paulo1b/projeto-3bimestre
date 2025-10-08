// src/routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.post('/', storeController.create);
router.get('/', storeController.getAll);
router.get('/:id', storeController.getById);
router.put('/:id', storeController.update);
router.delete('/:id', storeController.delete);

module.exports = router;
