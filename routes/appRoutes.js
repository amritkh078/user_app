const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

// Create a new record
router.post('/records', appController.createRecord);

// Get all records
router.get('/records', appController.getAllRecords);

// Get a record by ID
router.get('/records/:id', appController.getRecordById);

// Update a record
router.put('/records/:id', appController.updateRecord);

// Delete a record
router.delete('/records/:id', appController.deleteRecord);

module.exports = router;
