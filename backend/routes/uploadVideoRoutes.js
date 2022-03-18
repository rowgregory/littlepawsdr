import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
const router = express.Router();

router.route('/').post(async (req, res) => {
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split('.').pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    if ((file.mimetype = 'video/mp4')) {
      cb(null, true);
    } else {
      cb({ message: 'Unsupported File Format' }, false);
    }
  };

  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 30 * 1024 * 1024,
    },
    fileFilter,
  }).single('video');

  upload(req, res, err => {
    if (err) return res.send(err);

    const { path } = req.file;

    cloudinary.uploader.upload_large(
      path,
      { resource_type: 'video' },
      (err, video) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        return res.send(video);
      }
    );
  });
});

export default router;
