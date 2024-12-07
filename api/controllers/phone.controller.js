const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const { phoneType, number } = req.body; 

    // Validate input
    if (!phoneType || !number) {
        return res.status(400).send({
            message: "Phone type and phone number are required!"
        });
    }

    // Create phone object with the updated fields
    const phone = {
        phoneType: phoneType,   
        number: number, 
        contactId: parseInt(req.params.contactId)
    };

    Phones.create(phone)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the phone."
            });
        });
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll({
        where: {
            contactId: parseInt(req.params.contactId)
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving phones."
        });
    });
};

// Get one phone by id
exports.findOne = (req, res) => {
    Phones.findOne({
        where: {
            contactId: req.params.contactId,
            id: req.params.phoneId
        }
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "Phone not found with id=" + req.params.phoneId
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the phone."
        });
    });
};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.phoneId;

    // Validate input
    if (!req.body.phoneType && !req.body.number) {
        return res.status(400).send({
            message: "Phone type or phone number is required for update!"
        });
    }

    Phones.update(req.body, {
        where: { id: id, contactId: req.params.contactId }
    })
    .then(num => {
        if (num[0] === 1) {
            res.send({
                message: "Phone was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Phone with id=${id}. Maybe it was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Phone with id=" + id
        });
    });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.phoneId;

    Phones.destroy({
        where: { id: id, contactId: req.params.contactId }
    })
    .then(num => {
        if (num === 1) {
            res.send({
                message: "Phone was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Phone with id=${id}. Maybe it was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Phone with id=" + id
        });
    });
};
