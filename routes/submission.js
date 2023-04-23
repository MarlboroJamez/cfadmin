const express = require('express');
const router = express.Router();


const {
    uploadsubmissions
} = require('../controllers/submission');

const {
    dbsubmission, 
    updatesubmission
} = require('../controllers/dbsubmission');

const { 
    updateuploadsubmissions 
} = require('../controllers/updatesubmission');

const {
    fetchsubmissions
} = require('../controllers/fetchsubmissions');

router.route('/upload/:id').post(uploadsubmissions);
router.route('/update/upload/:id/:folder/:name').post(updateuploadsubmissions);
router.route('/submission').post(dbsubmission);
router.route('/submission/update').post(updatesubmission);
router.route('/submissions').get(fetchsubmissions);

module.exports = router;