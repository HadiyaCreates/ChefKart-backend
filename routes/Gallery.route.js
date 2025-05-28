

// const express = require('express');
// const router = express.Router();
// const {
//   getAllGallery,
//   addGalleryItem,
//   deleteAllGalleryItems,
//   updateGallery
// } = require('../controller/Gallery.controller');

// router.get('/get', getAllGallery);
// router.post('/add', addGalleryItem);
// router.delete('/deleteAll', deleteAllGalleryItems);
// router.put('/update/:id', updateGallery);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAllGallery,
  addGalleryItem,
  deleteAllGalleryItems,
  updateGallery
} = require('../controller/Gallery.controller');

router.post('/add', addGalleryItem);
router.put('/update/:id', updateGallery);
router.get('/get', getAllGallery);
router.delete('/deleteAll', deleteAllGalleryItems);

module.exports = router;
