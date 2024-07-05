// routes/users/userRoutes.ts

import express from 'express';

import { verifyJWT_MW } from '../config/middlewares';
import  {UsersController} from '../controllers/users/users.controller';
// import { createAccountSchema } from '../../validation/user.validation';

const router = express.Router();
const users = new UsersController();

router.post('/register', users.createUser);
router.post('/login', users.loginUser);

export default router;
