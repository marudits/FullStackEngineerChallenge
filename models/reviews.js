// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');
const service = require('../utils/service');

const reviews = {
    addReview: async (req, res) => {
        let { reviewer_id, reviewee_id, rate, comment } = req.body;

        if(!reviewer_id || !reviewee_id || !rate || !comment ){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        let data = await service.reviews.addReview(reviewer_id, reviewee_id, rate, comment)
            .then(res => {
                return res;
            })
            .catch(err => {
                return null
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    },
    assignReview: async (req, res) => {
        let { reviewer_id, reviewee_id } = req.body;

        if(!reviewer_id || !reviewee_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        let data = await service.reviews.assignReview(reviewer_id, reviewee_id)
            .then(res => {
                return res;
            })
            .catch(err => {
                return null
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }

        res.status(200).send(new Envelope(true, data));
    },
    getReviews: async (req, res) => {
        let data = await service.reviews.getReviews()
            .then(res => {
                return res;
            })
            .catch(err => {
                return null
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }

        res.status(200).send(new Envelope(true, data));
    },
    getReviewDetails: (req, res) => {
        const { rev_id } = req.params;

        if(!rev_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    },
    removeReview: async (req, res) => {
        const {rev_id } = req.params;

        if(!rev_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        let data = await service.reviews.removeReview(rev_id)
            .then(res => {
                return res;
            })
            .catch(err => {
                return null
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }

        res.status(200).send(new Envelope(true, data));
    },
    updateReview: async (req, res) => {
        const { rev_id } = req.params;
        let { payload } = req.body;

        if(!rev_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        try {
            JSON.parse(payload);
        } catch(e) {
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        let data = await service.reviews.updateReview(rev_id, JSON.parse(payload))
            .then(res => {
                return res;
            })
            .catch(err => {
                return null
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }

        res.status(200).send(new Envelope(true, data));
    }
}

module.exports = reviews;