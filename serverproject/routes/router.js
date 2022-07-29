const express = require('express');

const {addPost,listAllAds,getTopPage,getTopRated,getPagePosts,getAmountTopPage, getAllPostTitle, searchPost  } = require('../controllers/postsController');
const router = express.Router();

const multer = require("multer")
let multerUpload = multer()

router.post('/addPost', multerUpload.single("file") , addPost);
// router.post('/editPost',editPost);
// router.get('/deletePost', deletePost);
router.get('/listAllAds', listAllAds);
router.get('/getTopPage', getTopPage);
router.get('/getTopRated', getTopRated);
router.get('/getPagePosts', getPagePosts);
// router.get('/getSubSubject', getSubSubject);
router.get('/getAmountTopPage', getAmountTopPage);
router.get('/getAllPostTitle', getAllPostTitle);
router.get('/searchPost', searchPost);



module.exports = {
    routes: router
}