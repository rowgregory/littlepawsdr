import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from 'cloudinary';
const router = express.Router();

const fileUpload = multer();

router.route('/').post(fileUpload.single('image'), function (req, res, next) {
  try {
    let streamUpload = req => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      try {
        let result = await streamUpload(req);
        res.send(result);
      } catch (error) {
        console.log('ERROR: ', error);
        res.send({ msg: 'Upload cancelled' });
      }
    }

    upload(req);
  } catch (error) {
    console.log('ERROR: ', error);
    res.send({ msg: 'Please upload a photo first' });
  }
});

export default router;
