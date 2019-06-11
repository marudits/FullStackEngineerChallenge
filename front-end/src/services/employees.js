// library
import * as request from 'superagent';

// shared
const CONSTANTS = require('../shared/constants'); 

export const employeesService = {
    getEmployees: () => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.EMPLOYEES.ROOT}`;
        return request.get(URL)
    }
}