require('dotenv/config');

export default {
    secret: process.env.SECRET_JWT,
    expiresIn: '5m',
}