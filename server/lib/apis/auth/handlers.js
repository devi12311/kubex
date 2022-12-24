const Wreck = require('@hapi/wreck');
const axios = require('axios');

module.exports = {
    validateAccessToken: async (request ,h) => {
        const { token } = request.query;

        const githubAccessTokenUrl = `https://api.github.com/user`;
        const { payload } = await Wreck.get(githubAccessTokenUrl, {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'token ' + token,
                "Accept" : "application/vnd.github.v3+json",
                'User-Agent': 'Wreck'
            }
        })
        return JSON.parse(payload)
    }
}