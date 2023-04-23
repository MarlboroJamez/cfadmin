const express = require('express')
const router = express.Router()

const {
    validateclient
} = require('../controllers/client');

router.route('/validate').post(validateclient)

module.exports = router