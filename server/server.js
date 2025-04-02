// server/server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploaded files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original filename
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Basic file type detection (Improve this for production)
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  let fileType = 'unknown';

  if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
    fileType = 'image';
  } else if (['.pdf'].includes(fileExtension)) {
    fileType = 'pdf';
  } else if (['.txt'].includes(fileExtension)) {
    fileType = 'text';
  }

  res.json({
    message: 'File uploaded successfully!',
    filename: req.file.originalname,
    fileType: fileType,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
