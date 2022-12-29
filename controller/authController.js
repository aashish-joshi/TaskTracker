import * as dotenv from 'dotenv'
dotenv.config()

import { User } from '../models/user.js';
import { isEmail, hashPassword, sendJsonResponse } from '../common/functions.js';

class AuthController{
    static signup = async (req, res, next) => {

        const { fname, lname, email, password } = req.body;

        if(!fname || !lname || !email || !password ){
            return sendJsonResponse(req, res, next, 400, "", "missing data in request body");
        }

        if(!isEmail(email) ) {
            return sendJsonResponse(req, res, next, 400, "", `'${email}' is not a valid email address`);
        }

        const existingUser = await User.findOne({ email: email});

        if(existingUser){
          return sendJsonResponse(req, res, next, 400, "", `User already exists with email '${email}'`);
        }

        const hashedPassword = await hashPassword(password);

        const result = await User.create({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPassword
        })

        if(result){
          return sendJsonResponse(req, res, next, 201, result, "signup complete");
        }

    }

    static get_token = async (req, res, next) => {
      return sendJsonResponse(req, res, next, 200, result, "token");
    }
}

export { AuthController };