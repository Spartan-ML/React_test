const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Companies = db.companies;  // Import the new ompanies model
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).send({
            message: "Name and address are required!"
        });
    }

    const contact = {
        name: name,
        address: address,
    };

    Contacts.create(contact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the contact."
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving contacts."
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId;

    Contacts.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Contact not found with id=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Contact with id=" + id
            });
        });
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId;

    if (!req.body.name && !req.body.address) {
        return res.status(400).send({
            message: "Name or address is required for update!"
        });
    }

    Contacts.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num[0] === 1) {
            res.send({
                message: "Contact was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Contact with id=${id}. Maybe it was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Contact with id=" + id
        });
    });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = parseInt(req.params.contactId);

    Phones.destroy({
        where: { contactId: id }
    })
    .then(() => {
        Companies.destroy({
            where: { contactId: id }
        })
        .then(() => {
            Contacts.destroy({
                where: { id: id }
            })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "Contact was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Contact with id=${id}. Maybe it was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Contact with id=" + id
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete associated Companies for Contact with id=" + id
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete associated Phones for Contact with id=" + id
        });
    });
};

// Create a company associated with a contact
exports.createCompany = (req, res) => {
    const { company_name, company_address } = req.body;
    const contactId = parseInt(req.params.contactId);

    if (!company_name || !company_address) {
        return res.status(400).send({
            message: "Company name and address are required!"
        });
    }

    const company = {
        company_name,
        company_address,
        contactId  // Associate company with the contact
    };

    Companies.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the company."
            });
        });
};

// Get all companies associated with a contact
exports.findCompanies = (req, res) => {
    const contactId = parseInt(req.params.contactId);

    Companies.findAll({
        where: { contactId: contactId }
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
