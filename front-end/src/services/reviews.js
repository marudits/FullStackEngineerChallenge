// library
import * as request from 'superagent';

// shared
const CONSTANTS = require('../shared/constants'); 

export const reviewsService = {
    addReview: (reviewer_id, reviewee_id, rate, comment) => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.REVIEWS.ROOT}`;
        return request.post(URL).send({ reviewer_id, reviewee_id, rate, comment })
    },
    assignReview: (reviewer_id, reviewee_id) => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.REVIEWS.ASSIGN}`;
        return request.post(URL).send({ reviewer_id, reviewee_id })
    },
    deleteReview: (data) => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.REVIEWS.ROOT}/${data.uuid}`;
        return request.delete(URL);
    },
    getReviews: () => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.REVIEWS.ROOT}`;
        return request.get(URL)
    },
    updateReview: (data) => {
        let { uuid } = data;
        delete data['uuid'];
        delete data['reviewer_name'];
        delete data['reviewee_name'];

        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.REVIEWS.ROOT}/${uuid}`;
        return request.put(URL).send({ payload: JSON.stringify(data) })
    },
}