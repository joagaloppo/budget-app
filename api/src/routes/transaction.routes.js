import express from 'express';
const router = express.Router();

import { transactions, create, edit, remove } from '../controllers/transaction.controller.js';

router.get("/:id", transactions);
router.post("/", create);
router.put("/:id", edit);
router.delete("/:id", remove);

export default router;