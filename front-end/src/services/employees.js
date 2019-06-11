// library
import * as request from 'superagent';

// shared
const CONSTANTS = require('../shared/constants'); 

export const employeesService = {
    addEmployee: (name, email, department, position) => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.EMPLOYEES.ROOT}`;
        return request.post(URL).send({ name, email, department, position })
    },
    deleteEmployee: (data) => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.EMPLOYEES.ROOT}/${data.uuid}`;
        return request.delete(URL);
    },
    getEmployees: () => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.EMPLOYEES.ROOT}`;
        return request.get(URL)
    },
    updateEmployee: (data) => {
        let { uuid } = data;
        delete data['uuid'];

        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.EMPLOYEES.ROOT}/${uuid}`;
        return request.put(URL).send({ payload: JSON.stringify(data) })
    },
}