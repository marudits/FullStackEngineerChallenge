// libraries
const uuidv4 = require('uuid/v4');

// shared
const CONSTANTS = require('../shared/constants');
const knexPg = require('../shared/db/knex-pg');

const service = {
    employees: {
        addEmployee: (name, email, department, position) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES}`)
                .insert({ uuid: uuidv4(), name, email, department, position, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
                .then(res => res)
                .catch(err => {
                    console.error('service: employees: addEmployees: ', err);
                    return null;
                });
        },
        getEmployees: () => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES}`)
                .then(res => res )
                .catch(err => {
                    console.error('service: employees: getEmployees: ', err);
                    return null
                });
        },
        removeEmployee: (uuid) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES}`)
                .where('uuid', uuid)
                .del()
                .then(res => res)
                .catch(err => {
                    console.error('service: employees: removeEmployee: ', err);
                    return null;
                });
        },
        updateEmployee: (uuid, payload) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES}`)
                .where('uuid', uuid)
                .update(Object.assign({}, payload, { updated_at: new Date().toISOString() }))
                .then(res => res)
                .catch(err => {
                    console.error('service: employees: updateEmployee: ', err);
                    return null;
                });
        }
    }
}

module.exports = service;