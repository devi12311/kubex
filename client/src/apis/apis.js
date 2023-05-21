import axios from 'axios';

const service  = {
    login: async ({ username, password }) => {
        return axios.post(`http://localhost:3000/auth/login`, { username, password }).then(result => result.data);
    },

    getRepos: async (token) => {
        return axios.get(`http://localhost:3000/github/repos?token=${token}`);
    },

    getUser: async (token) => {
        return axios.get(`http://localhost:3000/github?token=${token}`);
    },

    saveRepos: async (token, repos) => {
        return axios.post(`http://localhost:3000/github/repos/save?token=${token}`, { repos });
    }
}

export default service
