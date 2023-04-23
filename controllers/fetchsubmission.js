const SubmissionModel = require('../models/Submission');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.fetchsubmissiondata = async (req, res) => {
  let { employer } = req.body;

  try {
    const updatedSubmission = await SubmissionModel.findOne({ employer: employer });

    if (!updatedSubmission) {
      return res.status(404).send({ message: 'Submission not found' });
    }

    const dirPath = `uploads/${updatedSubmission._id}`;

    const files = await s3.listObjectsV2({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: `${dirPath}/`,
      Delimiter: '/',
    }).promise();

    const directories = files.CommonPrefixes;
    const fileObjects = directories.map((directory) => {
      const folderName = directory.Prefix.replace(dirPath + '/', '');
      return s3.listObjectsV2({
        Bucket: process.env.S3_BUCKET_NAME,
        Prefix: directory.Prefix,
      }).promise()
        .then((result) => ({
          folder: folderName,
          files: result.Contents.map((file) => file.Key.replace(`${directory.Prefix}`, '')),
        }));
    });

    const fetchdata = await SubmissionModel.find({ employer: employer });

    res.status(200).send({
      uid: updatedSubmission._id,
      files: await Promise.all(fileObjects),
      data: fetchdata,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Unsuccessful',
    });
  }
};
