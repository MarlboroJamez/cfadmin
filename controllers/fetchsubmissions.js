const SubmissionModal = require('../models/Submission');

exports.fetchsubmissions = async (req, res) => {
    try {
        const submission = await SubmissionModal.find();
        res.status(200).json({
            sub: submission
        })
    } catch(err){
        console.log(err);
    }
}