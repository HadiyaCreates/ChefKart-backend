const { createTestimonial,  getAllTestimonial, getSingleTestimonial , updateTestimonial,deleteTestimonial} = require('../controller/Testimonial.controller');

const router = require('express').Router();

router.post('/createTestimonial' , createTestimonial);
router.get('/get' , getAllTestimonial);
router.get('/get/:id' , getSingleTestimonial);
router.put('/update/:id', updateTestimonial)
router.delete('/delete/:id', deleteTestimonial);



module.exports = router