require('dotenv').config({
    path: './config/.env'
});

const config = {
    server: {
        appUrl: process.env.APP_URL || 'http://localhost:3000/',
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,

        db: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER || 'postgres',
            pass: process.env.DB_PASS || '',
            name: process.env.DB_NAME || 'github'
        }
    }
}

module.exports = config