
const { createService, getAllServices, deleteAllServices, deleteServiceById } = require('../controller/Service.controller');

const router = require('express').Router();

router.post('/createService', createService);
router.get('/get', getAllServices);
router.delete('/delete', deleteAllServices);
router.delete('/delete/:id', deleteServiceById); 
module.exports = router;
