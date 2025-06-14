require('dotenv').config();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
const MONGO_URL = process.env.MONGO_URL

module.exports = ({
    JWT_USER_SECRET: JWT_USER_SECRET,
    JWT_ADMIN_SECRET: JWT_ADMIN_SECRET,
    MONGO_URL: MONGO_URL
})