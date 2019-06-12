// libraries
const uuidv4 = require('uuid/v4');

// shared
const CONSTANTS = require('../shared/constants');
const knexPg = require('../shared/db/knex-pg');

const service = {
    employees: {
        addEmployee: (name, email, department, position) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES}`)
                .insert({ uuid: uuidv4(), name, email, department, position })
                .then(res => res)
                .catch(err => {
                    console.error('service: employees: addEmployees: ', err);
                    return null;
                });
        },
        getEmployees: () => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES}`)
                .orderBy('created_at', 'DESC')
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
    },
    reviews: {
        addReview: (reviewer_id, reviewee_id, rate, comment) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.REVIEWS}`)
                .insert({ uuid: uuidv4(), reviewer_id, reviewee_id, rate, comment })
                .then(res => res)
                .catch(err => {
                    console.error('service: reviews: assignReview: ', err);
                    return null;
                });
        },
        assignReview: (reviewer_id, reviewee_id) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.REVIEWS}`)
                .insert({ uuid: uuidv4(), reviewer_id, reviewee_id })
                .then(res => res)
                .catch(err => {
                    console.error('service: reviews: assignReview: ', err);
                    return null;
                });
        },
        getReviews: () => {
            const QUERY = `
                SELECT 
                    r.*, e1.name as reviewer_name, e2.name as reviewee_name
                FROM 
                    ${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.REVIEWS} as r
                LEFT OUTER JOIN
                    ${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES} as e1
                ON
                    r.reviewer_id = e1.uuid
                LEFT OUTER JOIN
                    ${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.EMPLOYEES} as e2
                ON
                    r.reviewee_id = e2.uuid
                ORDER BY
                    r.created_at DESC

            `;
            return knexPg.raw(QUERY)
                .then(res => res && res.rows ? res.rows : null)
                .catch(err => {
                    console.error('service: reviews: getReviews: ', err);
                    return null;
                });
        },
        getReviewsBy: (params) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.REVIEWS}`)
            .where(params)
            .orderBy('created_at', 'DESC')
            .then(res => res)
            .catch(err => {
                console.error('service: reviews: getReviewsBy: ', err);
                return null;
            });
        },
        removeReview: (uuid) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.REVIEWS}`)
                .where('uuid', uuid)
                .del()
                .then(res => res)
                .catch(err => {
                    console.error('service: reviews: removeReview: ', err);
                    return null;
                });
        },
        updateReview: (uuid, payload) => {
            return knexPg(`${CONSTANTS.DATABASE.SCHEMA.PUBLIC}.${CONSTANTS.DATABASE.TABLE.REVIEWS}`)
            .where('uuid', uuid)
            .update(Object.assign({}, payload, { updated_at: new Date().toISOString() }))
            .then(res => res)
            .catch(err => {
                console.error('service: reviews: updateReview: ', err);
                return null;
            });
        }
    }
}

module.exports = service;