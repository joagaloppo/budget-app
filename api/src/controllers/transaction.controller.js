import { Transaction } from '../models/Transaction.js';

export const transactions = async (req, res) => {
    const { id } = req.params;
    try {
        const transactions = await Transaction.findAll({
            where: { userId: id },
            order: [ ['date', 'DESC'], ],
        })
        if (!transactions) return res.status(404).json({message: "No transactions were found"});
        res.status(200).json(transactions);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export const create = async (req, res) => {
    const { detail, amount, date, type, userId } = req.body
    if (!detail || !amount || !date || !type) return res.status(400).json({message: "Data missing"});
    if (!userId) return res.status(401).json({message: "You don't have permission to do this"});

    try {
        const newTransaction = await Transaction.create({ detail, amount, date, type, userId });
        res.status(201).json(newTransaction);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export const edit = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({message: "Data missing"});

    try {
        const transaction = await Transaction.findByPk(id);
        if (!transactions) return res.status(404).json({message: "The transaction wasn't found"});
        transaction.set(req.body);
        transaction.save();
        return res.status(200).json(transaction);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export const remove = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({message: "Data missing"});

    try {
        const response = await Transaction.destroy({
            where: { id },
        })
        return res.status(204).json(response);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}