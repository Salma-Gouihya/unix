const express = require('express');
const router = express.Router();
const entrepotController = require('../controllers/entrepotController');

// GET all items
router.get('/', entrepotController.getAllItems);

// GET item by ID
router.get('/:id', entrepotController.getItemById);

// POST create new item
router.post('/', entrepotController.createItem);

// PUT update item
router.put('/:id', entrepotController.updateItem);

// DELETE item
router.delete('/:id', entrepotController.deleteItem);

module.exports = router;