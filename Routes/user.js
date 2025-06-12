import express from 'express'
import { login, register } from '../Controller/user.js';

const userRouter = express.Router();

// @api desc :- user register
// @api method :- post
// @api end point:- api/user/register
userRouter.post('/register', register);


// @api desc :- user login
// @api method :- post
// @api end point:- api/user/login
userRouter.post('/login', login);

export default userRouter;