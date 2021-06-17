const config = {
    PORT: 4000,
    DB_URI: 'mongodb://localhost/video-tutorials',
    SALT_ROUNDS: 10,
    SECRET: "CUSTOM#STRING",
    COOKIE_NAME: "token"
}

module.exports = config;