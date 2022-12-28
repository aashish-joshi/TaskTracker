import * as dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcryptjs/dist/bcrypt.js';

export function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}
export async function hashPassword(password) {
    return bcrypt.hash(password, Number(process.env.SALT_ROUND))
}