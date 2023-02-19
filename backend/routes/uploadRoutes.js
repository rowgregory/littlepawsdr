import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|heic|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.route('/').post(upload.single('image'), (req, res, next) => {
  try {
    if (req.file) {
      res.status(200).send(`/${req.file.path}`);
    }
  } catch (error) {
    console.log('ERROR: ', error);
    res.send({ msg: 'Please upload a photo first' });
  }
});

export default router;
