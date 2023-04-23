const SubmissionModel = require('../models/Submission');

exports.validateclient = async (req, res, next) => {
    const { email } = req.body;

    // email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send("Invalid email address");
    }

    try {
        const validation = await SubmissionModel.findOne({ employer: email });

        if (validation) {
            res.status(200).send("Successful login");
            console.log('Login Successful')
        } else {
            const submission = await SubmissionModel.create({ employer: email });
            console.log('Login Successful');
            res.status(200).send('Your account has been created successfully');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("If this issue persists please don't hesitate in contacting us.");
    }
};
