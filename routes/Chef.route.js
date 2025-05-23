const { createChef , getAllChefs, getChefById , updateChefById , deleteChefById, deleteAllChefs} = require('../controller/Chef.controller');

const router = require('express').Router();

router.post('/createchef' ,  createChef);
router.get('/get' , getAllChefs);
router.get('/get/:id' ,getChefById);
router.put('/update/:id', updateChefById)
router.delete('/delete/:id',deleteChefById);
router.delete('/delete', deleteAllChefs);

module.exports = router;