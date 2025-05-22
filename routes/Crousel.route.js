const { createCrousel, getAllCrousel,  getCrouselById,updateCrouselById, deleteCrouselById,deleteAllCrousel  } = require('../controller/Crousel.controller');

const router = require('express').Router();

router.post('/createCrousel' , createCrousel);
router.get('/get' , getAllCrousel);
router.get('/get/:id' , getCrouselById);
router.put('/update/:id', updateCrouselById)
router.delete('/delete/:id', deleteCrouselById);
router.delete('/delete', deleteAllCrousel);



module.exports = router