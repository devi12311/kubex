import GuestAPI from '@utils/plugins/GuestAPI';
import API from '@utils/plugins/API';

const AuthService = {
  login: (username, password) => {
    return GuestAPI.post('login', {
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
