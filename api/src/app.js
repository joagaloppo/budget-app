import express from 'express';
import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js'

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);

export default app;