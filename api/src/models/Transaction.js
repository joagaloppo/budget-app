import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    detail: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: { 
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    type: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
} );