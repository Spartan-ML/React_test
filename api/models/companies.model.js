module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        company_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false, 
        },
        company_address: {
            type: Sequelize.STRING,
            allowNull: true, 
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
        tableName: 'companies', 
    });

    return Company;
};
