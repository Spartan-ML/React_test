module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false, 
        },
        phoneType: {
            type: Sequelize.ENUM('Mobile', 'Home', 'Work', 'Other'), // Add the phoneType column
            allowNull: false, 
            defaultValue: 'Other', 
        },
        contactId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts',
                key: 'id',
            },
            onDelete: 'CASCADE',  
        },
        createdAt: {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW, 
        },
        updatedAt: {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW, 
        },
    }, {
        tableName: 'phones',  
    });

    return Phone;
};
