// routes/users/userRoutes.ts

import express from 'express';

import { verifyJWT_MW } from '../config/middlewares';
import  {TodoController} from '../controllers/todo/todo.controller';

const router = express.Router();
const todo = new TodoController();
router.post('/', verifyJWT_MW, todo.createTodo);
router.get('/', verifyJWT_MW, todo.getTodoLists);
router.delete('/:id', verifyJWT_MW, todo.deleteTodo);
router.put('/:id', verifyJWT_MW, todo.updateTodo);
router.put('/:id/complete', verifyJWT_MW, todo.markTodoComplete);
router.put('/:id/uncomplete', verifyJWT_MW, todo.unmarkTodoComplete);
export default router;
