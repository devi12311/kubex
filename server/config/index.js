require('dotenv').config({
    path: './config/.env'
});

const config = {
    server: {
        appUrl: process.env.APP_URL || 'http://0.0.0.0:3000/',
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 3000,

        db: {
            host: process.env.DB_HOST || 'postgres',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER || 'root',
            pass: process.env.DB_PASS || 'D3345123Galsjd',
            name: process.env.DB_NAME || 'kubex'
        },
        auth: {
            secret: process.env.AUTH_SECRET || 'aoisjioqwjdoqwijdqwodj',
            refreshTokenExpiration: process.env.AUTH_REFRESH_TOKEN_EXPIRATION || 60 * 60 * 24 * 60,
            accessTokenExpiration: process.env.AUTH_ACCESS_TOKEN_EXPIRATION || 60 * 60 * 4,
        },
    }
}

module.exports = config
