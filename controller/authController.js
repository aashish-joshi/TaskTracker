import * as dotenv from 'dotenv'
dotenv.config()

import { User } from '../models/user.js';
import { isEmail, hashPassword } from '../common/functions.js';

class AuthController{
    static signup = async (req, res, next) => {

        const { fname, lname, email, password } = req.body;

        if(!fname || !lname || !email || !password ){
            return res.status(400).json({
                status: "failed",
                data: "",
                message: "missing data in request body"
            });
            
        }

        if(!isEmail(email) ) {
            return res.status(400).json({
                status: "failed",
                data: "",
                message: `'${email}' is not a valid email address.`
            });
            
        }

        const existingUser = await User.findOne({ email: email});
        if(existingUser){
            return res.status(400).json({
                status: "failed",
                data: "",
                message: `User already exists with email '${email}'`
            });
            
        }

        const hashedPassword = await hashPassword(password);

        const result = await User.create({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPassword
        })

        if(result){
            return res.status(201).json({
                status: "success",
                data: result,
                message: "signup complete"
            });
        }

    }

    static get_token = async (req, res, next) => {
        res.json({message: "token"})
    }
}

export { AuthController };