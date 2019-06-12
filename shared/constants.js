const CONSTANTS = {
    DATABASE: {
        SCHEMA: {
            PUBLIC: 'public'
        },
        TABLE: {
            EMPLOYEES: 'employees',
            REVIEWS: 'reviews'
        }
    },
    RESPONSE: {
        CODE: {
            400: 'INVALID_DATA',
            401: 'UNAUTHORIZED',
            404: 'NOT_FOUND',
            500: 'INTERNAL_SERVER_ERROR'
        }
    },
    REVIEWS: {
        TYPE: {
            PENDING: 'pending',
            REVIEWEE: 'reviewee',
            REVIEWER: 'reviewer'
        }
    }
}

module.exports = CONSTANTS;