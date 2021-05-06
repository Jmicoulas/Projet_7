const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const PostCtlr = require('../Controllers/Post');

router.post('/publishPost', multer, PostCtlr.publishPost);
router.get('/getAllPosts', PostCtlr.getAllPost);
router.post('/getOnePost', PostCtlr.getOnePost);
router.delete('/deletePost',auth, PostCtlr.deletePost);
router.post('/updatePost',auth, PostCtlr.updatePost);

module.exports = router;