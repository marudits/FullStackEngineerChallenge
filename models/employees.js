// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');
const service = require('../utils/service');

const employees = {
    addEmployee: async (req, res) => {

        let { name, email, department, position } = req.body;

        if(!name || !email || !department || !position){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        let data = await service.employees.addEmployee(name, email, department, position)
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
    getEmployees: async (req, res) => {
        
        let data = await service.employees.getEmployees()
            .then(res => {
                return res;
            })
            .catch(err => {
                return null;
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }

        res.status(200).send(new Envelope(true, data));
    },
    getEmployeeDetails: (req, res) => {
        res.status(200).send(new Envelope(true, []));
    },
    removeEmployee: async (req, res) => {
        const { emp_id } = req.params;

        if(!emp_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        let data = await service.employees.removeEmployee(emp_id)
            .then(res => {
                return res;
            })
            .catch(err => {
                return null;
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }

        res.status(200).send(new Envelope(true, data));
    },
    updateEmployee: async (req, res) => {
        const { emp_id } = req.params;
        let { payload } = req.body;

        if(!emp_id){
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        try {
            JSON.parse(payload);
        } catch(e) {
            res.status(400).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }));
            return;
        }

        let data = await service.employees.updateEmployee(emp_id, JSON.parse(payload))
            .then(res => {
                return res;
            })
            .catch(err => {
                return null;
            });

        if(!data){
            res.status(500).send(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['500']}));
            return;
        }
        
        res.status(200).send(new Envelope(true, data));
    }
}

module.exports = employees;