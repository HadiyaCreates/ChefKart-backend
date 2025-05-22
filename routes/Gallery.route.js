const { createGallery ,  getAllGallery , deleteAllGallery} = require('../controller/Gallery.controller');


const router = require('express').Router();

router.post('/creategallery' ,  createGallery);
router.get('/get' , getAllGallery);
router.delete('/delete' , deleteAllGallery);

module.exports = router;