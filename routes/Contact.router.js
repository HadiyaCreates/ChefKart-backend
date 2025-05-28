// const { createContact } = require('../controller/Contact.controller');
// const router = require('express').Router();

// router.post('/contact', createContact);

// module.exports = router;
const express = require('express');
const router = express.Router();

const { createContact } = require('../controller/Contact.controller'); // adjust path if needed

// POST /contact
router.post('/createContact', createContact);

module.exports = router;
