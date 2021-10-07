require("dotenv").config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
export const ACTIVATE_TOKEN_SECRET = process.env.ACTIVATE_TOKEN_SECRET;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const MONGODB_URL = process.env.MONGODB_URL;
export const MAIL_CLIENT_ID = process.env.MAIL_CLIENT_ID;
export const MAIL_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
export const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
export const SENDER_MAIL_ADDRESS = process.env.SENDER_MAIL_ADDRESS;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
