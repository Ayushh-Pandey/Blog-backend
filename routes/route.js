const express = require('express');

const { createPost, updatePost, deletePost, getPost, getAllPosts } = require('../controller/post-controller');
const { uploadImage, getImage } = require('../controller/image-controller');
const { newComment, getComments, deleteComment } = require('../controller/comment-controller');
const { loginUser, singupUser, logoutUser } = require('../controller/user-controller');
const { authenticateToken, createNewToken } = require('../controller/jwt-controller');

const upload = require('../utils/upload');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id',authenticateToken, getPost);
router.get('/posts',authenticateToken, getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments',authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

module.exports = router;