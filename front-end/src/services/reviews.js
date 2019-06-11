// library
import * as request from 'superagent';

// shared
const CONSTANTS = require('../shared/constants'); 

export const reviewsService = {
    getReviews: () => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.REVIEWS.ROOT}`;
        return request.get(URL)
    }
}