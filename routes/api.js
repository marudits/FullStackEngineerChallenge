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
router.delete('/employees/:emp_id', employees.removeEmployee);
router.put('/employees/:emp_id', employees.updateEmployee);

// API: reviews
router.get('/employees/:emp_id/reviews', reviews.getEmployeeReviews);
router.get('/employees/:emp_id/reviews/:rev_id', reviews.getReviewDetails);
router.post('/employees/:emp_id/reviews', reviews.addReview);
router.delete('/employees/:emp_id/reviews/:rev_id', reviews.removeReview);
router.put('/employees/:emp_id/reviews/:rev_id', reviews.updateReview);

// default router
router.get('*', (req, res, next) => {
    const URL = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(404).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['404'], url: URL }));
});

module.exports = router;
