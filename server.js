import express from 'express'
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contactRouter.js';

import { config } from 'dotenv';

const app = express();
app.use(express.json());

// .env setup , here we give the path
config({path:'.env'})



// User routes
// @api desc :- user register
// @api method :- post
// @api end point:- api/user/register
app.use('/api/user', userRouter)

app.use('/api/contact', contactRouter)

// to use env variables we use process.env.variableinenv
mongoose.connect(
    process.env.MONGO_URI
 , { dbName: "NodejsMasteryCourse" }
).then(() => console.log("mongodb is connected")).catch((err) => console.log(err));



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})