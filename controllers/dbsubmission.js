const SubmissionModel = require('../models/Submission');

exports.dbsubmission = async (req, res, next) => {
    const {submission, employer} = req.body;

    try {
        const sub = await SubmissionModel.updateOne({employer: employer}, {
            submission: submission
        })

        const updatedSubmission = await SubmissionModel.findOne({ employer: employer });

        res.status(200).send({
            message: 'Submission was successful',
            data: {
                _id: updatedSubmission._id,
                submission: updatedSubmission.submission,
                employer: updatedSubmission.employer
            }
        });
        console.log('Submission was successful')
    } catch(err){
        console.log(err)
        res.status(500).send({
            message: "Submission has been unsuccessful. If this issue persists, please don't hesistate in engaging with us."
        })
    }
}

exports.updatesubmission = async (req, res, next) => {
    const {submission, employer} = req.body;

    try {
        const sub = await SubmissionModel.updateOne({employer: employer}, {
            submission: submission
        })

        const updatedSubmission = await SubmissionModel.findOne({ employer: employer });

        res.status(200).send({
            message: 'Submission was successful',
            data: {
                _id: updatedSubmission._id,
                submission: updatedSubmission.submission,
                employer: updatedSubmission.employer
            }
        });
        console.log('Submission was successful')
    } catch(err){
        console.log(err)
        res.status(500).send({
            message: "Submission has been unsuccessful. If this issue persists, please don't hesistate in engaging with us."
        })
    }
}