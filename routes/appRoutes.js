const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { validateRecord } = require('../middleware/validateRecord');

// Create a new record
router.post('/records',validateRecord, appController.createRecord);

// Get all records
router.get('/records',validateRecord, appController.getAllRecords);

// Get a record by ID
router.get('/records/:id',validateRecord, appController.getRecordById);

// Update a record
router.put('/records/:id',validateRecord, appController.updateRecord);

// Delete a record
router.delete('/records/:id',appController.deleteRecord);

module.exports = router;
