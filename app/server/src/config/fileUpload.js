const multer = require('multer');
const path=require("path");

// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/root/server/src/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

module.exports = {
  upload: upload,
};
