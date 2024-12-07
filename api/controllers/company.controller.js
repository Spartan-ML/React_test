const db = require("../models");
const Company = db.companies;
const Op = db.Sequelize.Op;

// Create company
exports.create = (req, res) => {
    const { company_name, company_address } = req.body;

    // Validate input
    if (!company_name || !company_address) {
        return res.status(400).send({
            message: "Company name and company address are required!"
        });
    }

    // Create company object
    const company = {
        company_name: company_name,
        company_address: company_address,
        contactId: parseInt(req.params.contactId)
    };

    Company.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the company."
            });
        });
};

// Get all companies for a specific contact
exports.findAll = (req, res) => {
    Company.findAll({
        where: {
            contactId: parseInt(req.params.contactId)
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};

// Get one company by id
exports.findOne = (req, res) => {
    Company.findOne({
        where: {
            contactId: req.params.contactId,
            id: req.params.company_id 
        }
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "Company not found with id=" + req.params.company_id
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the company."
        });
    });
};

// Update one company by id
exports.update = (req, res) => {
    const id = req.params.company_id;

    // Validate input
    if (!req.body.company_name && !req.body.company_address) {
        return res.status(400).send({
            message: "Company name or company address is required for update!"
        });
    }

    Company.update(req.body, {
        where: { company_id: id, contactId: req.params.contactId } 
    })
    .then(num => {
        if (num[0] === 1) {
            res.send({
                message: "Company was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Company with id=${id}. Maybe it was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Company with id=" + id
        });
    });
};

// Delete one company by id
exports.delete = (req, res) => {
    const id = req.params.company_id;

    Company.destroy({
        where: { company_id: id, contactId: req.params.contactId } 
    })
    .then(num => {
        if (num === 1) {
            res.send({
                message: "Company was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Company with id=${id}. Maybe it was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Company with id=" + id
        });
    });
};
