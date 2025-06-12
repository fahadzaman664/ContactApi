import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const customjwttoken = process.env.CUSTOMJWTTOKEN;

export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (email == '' || name == '' || password == '') {
            return res.json({ message: "all fields are required" })
        }

        let db = await User.findOne({ email });

        if (db) {
            return res.json({ message: 'user already exist...', success: true })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        db = await User.create({
            name: name,
            email: email,
            password: hashPassword
        })

        res.status(202).json({ message: 'user created successfuly', success: true, Userdata: db });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}


export const login = async (req, res) => {
    try {

        const { email, name, password } = req.body;
        if (email == '' || password == '') {
            return res.json({ message: "all fields are required" })
        }

        let db = await User.findOne({ email });

        if (!db) {
            return res.json({ message: 'user not exist', success: false })
        }

        const hashpass = await bcrypt.compare(password, db.password)
        if (!hashpass) {
            return res.json({ message: 'invalid password', success: false })
        }

        const token = jwt.sign({userId: db._id}, customjwttoken);

        res.json({ success: true,token: token, name: db.name })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });

    }


}