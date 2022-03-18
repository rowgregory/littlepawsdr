import express from 'express';
import cloudinary from 'cloudinary';
const router = express.Router();

router.route('/:id').post((req, res, next) => {
  const publicId = req.params.id;
  try {
    cloudinary.uploader.destroy(publicId, result => {
      res.send(result);
    });
  } catch (error) {
    console.log('ERROR: ', error);
  }
});

export default router;
