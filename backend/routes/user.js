const express = require('express');
const { editUserInfo, getUserInfo, removeUser,uploadAvatar,editAvatar } = require('../controllers/user');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('hello');
    cb(null, 'uploads/avatar/'); // Set upload destination
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    const uniqueName = `${uuidv4()}${ext}`; // Create a unique filename with UUID and extension
    cb(null, uniqueName); // Pass the new filename to multer
  }
});

const upload = multer({storage:storage});
  // image uploads
  router.post('/upload/avatar',upload.single('image'),uploadAvatar);
  router.put('/upload/avatar',upload.single('image'),editAvatar);

  // User Routes
  router.put('/',editUserInfo);
  // router.put('/password',editPassword);
  router.get('/',getUserInfo);
  router.delete('/',removeUser);


module.exports = router;