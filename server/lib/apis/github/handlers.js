const Wreck = require('@hapi/wreck');

module.exports = {
    getUserProfile: async (request ,h) => {
        const { token } = request.query;
        const githubUserProfileUrl = `https://api.github.com/user`;
        const { payload } = await Wreck.post(githubUserProfileUrl, {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'token ' + token,
                "Accept" : "application/vnd.github.v3+json",
                'User-Agent': 'Wreck'
            }
        })

        return JSON.parse(payload)
    },

    getUserRepos: async (request, h) => {
        const { token } = request.query;
        const githubAccessTokenUrl = `https://api.github.com/user/repos`;
        const { payload } = await Wreck.get(githubAccessTokenUrl, {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'token ' + token,
                "Accept" : "application/vnd.github.v3+json",
                'User-Agent': 'Wreck'
            }
        })
        return JSON.parse(payload)
    },

    saveRepos: async (request, h) => {
        const { GithubRepos } = request.server.app.models;
        const { repos } = request.payload;

        await GithubRepos.bulkCreate(repos, { ignoreDuplicates: true });

        return { message: 'Success' };
    }
}