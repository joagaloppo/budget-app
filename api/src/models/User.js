import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Transaction } from './Transaction.js';

export const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Association » User x Transactions
User.hasMany(Transaction, {
    foreignKey: 'userId',
    sourceKey: 'id',
});

// Association » Transaction x User
Transaction.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id',
})