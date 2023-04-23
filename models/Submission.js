const mongoose = require('mongoose'); //

const SubmissionSchema = new mongoose.Schema({
    creation: {type: Date},
    employer: {type: String},
    submission: [],
});

SubmissionSchema.pre('save', function(next){
    this.creation = Date.now();
    next();
});

const Submissions = mongoose.model('submissions', SubmissionSchema);

module.exports = Submissions;