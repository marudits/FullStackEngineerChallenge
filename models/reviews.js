// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');

const reviews = {
    addReview: (req, res) => {
        const { emp_id } = req.params;

        if(!emp_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    },
    getEmployeeReviews: (req, res) => {
        const { emp_id } = req.params;

        if(!emp_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    },
    getReviewDetails: (req, res) => {
        const { emp_id, rev_id } = req.params;

        if(!emp_id || !rev_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    },
    removeReview: (req, res) => {
        const { emp_id, rev_id } = req.params;

        if(!emp_id || !rev_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    },
    updateReview: (req, res) => {
        const { emp_id, rev_id } = req.params;

        if(!emp_id || !rev_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    }
}

module.exports = reviews;