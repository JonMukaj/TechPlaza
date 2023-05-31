const multer = require('multer');
const path = require("path");

// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/root/server/src/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E5);
    const extname = path.extname(file.originalname);
    const filename = req.params.id + '_' + uniqueSuffix + extname;
    cb(null, filename);
  },
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

module.exports = {
  upload: upload,
};
