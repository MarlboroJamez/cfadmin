const { S3Client, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const archiver = require('archiver');
const fs = require('fs');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.downloadFolder = async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: 'uploads/',
  };
  try {
    const data = await s3.send(new ListObjectsCommand(params));
    const files = data.Contents.map((file) => file.Key);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', function (err) {
      throw err;
    });
    res.attachment('uploads.zip');
    archive.pipe(res);
    console.log('Starting download...');
    for (const file of files) {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file,
      };
      console.log(`Downloading file: ${file}`);
      const data = await s3.send(new GetObjectCommand(params));
      archive.append(data.Body, { name: file });
      console.log(`Downloaded file: ${file}`);
    }
    archive.finalize();
    console.log('Download completed successfully!');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
