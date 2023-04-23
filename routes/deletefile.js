const express = require('express');
const router = express.Router();

const {
    downloadFolder
} = require('../controllers/deletefile');

router.route('/download').get(downloadFolder);

module.exports = router;