import multer from 'multer';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString()}-${file.originalname}`.replace(/:/g, '-')
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(
      {
        message:
          'unsupported file format, Image could be only jpeg, png and jpg'
      },
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter
});

export default upload;
