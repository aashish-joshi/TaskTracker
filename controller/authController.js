import * as dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { isEmail, hashPassword, matchPassword } from '../common/functions.js';

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
        const { email, password } = req.body;

        // Check if email address is valid
        // Hash the password
        // Check if email exists in db
        // If email exists, check if hashed password matches
        // If no match, increase wrong login count
        // If password matches, send JWT token.

        if( !email || !password ){
            return res.status(400).json({
                status: "failed",
                data: "",
                message: "missing data in request body"
            });
            
        }
        try {
            const existingUser = await User.findOne({ email: email});
            if(!existingUser){
                console.log('email not found')
                return res.status(403).json({
                    status: "failed",
                    data: "",
                    message: 'Email or password is incorrect'
                });
            }else{

                if (existingUser.status === 'active'){

                    // if(existingUser.password === hashedPassword){
                    if(matchPassword(existingUser.password, password)){
                        const token = jwt.sign({
                            id: existingUser._id,
                            email: existingUser.email,
                            issuer: 'api.tasktracker',
                            
                        }, process.env.JWT_SECRET,{ expiresIn: '2h' } );
                        return res.status(200).json({
                            status: "success",
                            data: {
                                access_token: token,
                                token_type: 'Bearer',
                                expiresIn: '7200'
                            },
                            message: "access token generated"
                        })
                    }else{
                        console.log('password mismatch')
                        return res.status(403).json({
                            status: "failed",
                            data: "",
                            message: 'Email or password is incorrect'
                        });
                    }
                } else {
                    return res.status(401).json({
                        status: "failed",
                        data: "",
                        message: 'account locked'
                    });
                }
            }
            
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                data: "",
                message: "something went wrong"
            })
        }
    }
}

export { AuthController };