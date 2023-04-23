const express = require('express');
const router = express.Router();


const {
    updatesubmission
} = require('../controllers/updatesubmission');

router.route('/update').post(updatesubmission);

module.exports = router;