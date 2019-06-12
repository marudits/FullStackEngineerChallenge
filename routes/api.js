var express = require('express');
var router = express.Router();

// models
const employees = require('../models/employees');
const reviews = require('../models/reviews');

// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');

// API: employees
router.get('/employees', employees.getEmployees);
router.get('/employees/:emp_id', employees.getEmployeeDetails);
router.post('/employees', employees.addEmployee);
router.put('/employees/:emp_id', employees.updateEmployee);
router.delete('/employees/:emp_id', employees.removeEmployee);

// API: reviews
router.get('/reviews', reviews.getReviews);
router.get('/reviews/:rev_id', reviews.getReviewDetails);
router.post('/reviews/assign', reviews.assignReview);
router.post('/reviews', reviews.addReview);
router.put('/reviews/:rev_id', reviews.updateReview);
router.delete('/reviews/:rev_id', reviews.removeReview);

// default router
router.get('*', (req, res, next) => {
    const URL = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(404).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['404'], url: URL }));
});

module.exports = router;
