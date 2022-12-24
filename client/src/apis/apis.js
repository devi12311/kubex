import axios from 'axios';

const service  = {
    login: async (token) => {
        return axios.get(`http://localhost:3000/auth/github?token=${token}`);
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