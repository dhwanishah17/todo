import express from 'express';
import userRoutes from './users.routes';
import todoRoutes from './todo.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/todo', todoRoutes);


export default router;
