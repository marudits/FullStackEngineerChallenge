// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');

const employees = {
    addEmployee: (req, res) => {
        res.status(200).send(new Envelope(true, []));
    },
    getEmployees: (req, res) => {
        res.status(200).send(new Envelope(true, []));
    },
    getEmployeeDetails: (req, res) => {
        res.status(200).send(new Envelope(true, []));
    },
    removeEmployee: (req, res) => {
        const { emp_id } = req.params;

        if(!emp_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        res.status(200).send(new Envelope(true, []));
    },
    updateEmployee: (req, res) => {
        const { emp_id } = req.params;

        if(!emp_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }
        
        res.status(200).send(new Envelope(true, []));
    }
}

module.exports = employees;