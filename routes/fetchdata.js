const express = require('express');
const router = express.Router();

const {
    fetchsubmissiondata
} = require('../controllers/fetchsubmission');

router.route('/fetch').post(fetchsubmissiondata);

module.exports = router;