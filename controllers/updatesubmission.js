const SubmissionModel = require('../models/Submission');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const formTextData = req.body; // <-- get form data here
      const submissionId = req.params.id;
      const folder = req.params.folder;
      const fileName = file.originalname;
      const key = `uploads/${submissionId}/${folder}/${fileName}`;
      console.log('Form data:', formTextData); // <-- log form data here
      cb(null, key);
    },
  }),
});


exports.updateuploadsubmissions = async (req, res) => {
  try {
    const { id, name } = req.params;
    const updateObj = {};
    updateObj[`submission.0.${name}`] = true; // <-- update the "csd" field
    await SubmissionModel.updateOne({ _id: id }, { $set: updateObj});
    
    // Upload files
    await new Promise((resolve, reject) => {
      upload.any()(req, res, function (err) {
        if (err) {
          console.error(err);
          reject('Error uploading files');
        }
        resolve();
      });
    });
    
    const formTextData = req.body;
    const files = req.files;
    console.log('Form data:', formTextData);
    console.log('Uploaded files:', files);
    
    res.status(200).send({ code: id }); // <-- return submissionId as response
  } catch (error) {
    console.error(error);
    return res.status(400).send('Error creating submission data');
  }
};

