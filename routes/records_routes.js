const express = require('express');
const router = express.Router();
const recordController = require('../methods/attendance_records');

router.get('/', recordController.getAll);
router.post('/', recordController.create);
router.get('/:movieId', recordController.getById);
router.put('/:movieId', recordController.updateById);
router.delete('/:movieId', recordController.deleteById);

module.exports = router;