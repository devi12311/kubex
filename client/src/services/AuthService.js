import GuestAPI from '@utils/plugins/GuestAPI';
import API from '@utils/plugins/API';

const AuthService = {
  register: (username, password, email) => {
    return GuestAPI.post('/auth/register', {
      username,
      password
    });
  },
  login: (username, password) => {
    return GuestAPI.post('/auth/login', {
      username,
      password
    });
  },
  changePassword: (password, passwordConfirmation) => {
    return API.patch('users/change-my-password', {
      password,
      passwordConfirmation
    });
  }
};

export default AuthService;
