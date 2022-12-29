import * as dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

/**
 *
 * Check if the given string appears to be a valid email address.
 *
 * @param {string} email The email address to check.
 * @returns Boolean
 */
export function isEmail(email) {
	var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	if (email !== "" && email.match(emailFormat)) {
		return true;
	}

	return false;
}

/**
 * Hash a password using bcrypt before storing in database.
 *
 * @param {string} password The string to hash.
 * @returns Hashed string.
 */
export async function hashPassword(password) {
    return await bcrypt.hash(password, Number(process.env.SALT_ROUND))
}

export async function matchPassword(hashed, plain) {
    return await bcrypt.compare(plain, hashed);
	return await bcrypt.hash(password, Number(process.env.SALT_ROUND));
}

/**
 * Send a JSON response back to the client.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {number} status The HTTP status code of the response
 * @param {*} data The data to be sent in the response.
 * @param {*} message Message to be included in the response.
 */
export function sendJsonResponse(req, res, next, status, data, message) {
  const json = {};

  json.message = message;
  json.data = data;
  
  if (status >= 400){
    json.status = 'failed';
  }else{
    json.status = 'success';
  }

  res.status(status).json(json);

}
