import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.route('/').post((req, res, next) => {
  const image = req.body.publicId;
  try {
    const __dirname = path.resolve();
    fs.unlinkSync(path.join(__dirname, image));

    res.send('Image Deleted');
  } catch (error) {
    console.log('ERROR: ', error);
  }
});

export default router;
