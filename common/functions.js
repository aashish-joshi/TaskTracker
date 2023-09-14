/* eslint-disable require-jsdoc */
import * as dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';

/**
 *
 * Check if the given string appears to be a valid email address.
 *
 * @param {string} email The email address to check.
 * @return Boolean
 */
export function isEmail(email) {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== '' && email.match(emailFormat)) {
    return true;
  }

  return false;
}

/**
 * Hash a password using bcrypt before storing in database.
 *
 * @param {string} password The string to hash.
 * @return Hashed string.
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUND));
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
export function sendJsonResponse(
    req,
    res,
    next,
    status,
    data,
    message,
    links = [],
) {
  const json = {};

  json.message = message;
  json.data = data;

  if (status >= 400) {
    json.status = 'failed';
  } else {
    json.status = 'success';
  }

  res.status(status).json(json, links);
}

export async function sendEmail(message) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: message.to, // Change to your recipient
    from: message.from, // Change to your verified sender
    templateId: 'd-94373015d007403f96561bf6d26238ef',
    dynamicTemplateData: {
      first_name: message.name,
      email: message.to,
      Sender_email: message.from,
    },
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      console.error(error.response);
      return error.response;
    }
  }
  return true;
}
