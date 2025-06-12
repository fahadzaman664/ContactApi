import jwt from 'jsonwebtoken'
import { User } from '../Models/User.js'
const customjwttoken = process.env.CUSTOMJWTTOKEN;

// to check whether the specific user is login or not 
// so middle ware to check if specific user is logedin or not
export const isAuthenticated = async (req, res, next)=>{
    const token = req.header('Auth')
    if(!token){
        return res.json({message: 'please login first'})
    }

    const decode =  jwt.verify(token, customjwttoken)
    // userid is comming from decode
    const id = decode.userId;
    // now we have to verify this userid from database
    let user = await User.findById(id)
    if(!user){
        return res.json({message:'user not find'})
    }
    // here we can save globaly user in node with req.user variable at can be req.superman etc, I will use req.user 
    req.user = user // it mean user is saved globally
    next(); // it means that the user of verified and now after isauthenticed newContact will call in contactRouter.js -> contactRouter.post('/new',isAuthenticated, newContact)
   
}