import React, { useState } from 'react';
import { showError } from '@utils/helpers';
import { useDispatch } from 'react-redux';
import { authenticate } from '@redux/authentication/Action';
import { hideSpinner, showSpinner } from '@redux/spinner/Action';
import { useNavigate } from 'react-router-dom';
import AuthService from '@services/AuthService';
import Input from '@core/inputs/Input';
import _ from 'lodash';
import DefaultButton from '@core/buttons/electrons/DefaultButton';
import PasswordInput from '@core/inputs/PasswordInput';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const onSubmit = (e) => {
    if ((!username, !password, !email)) {
      showError('Please enter your data');
    }
    e.preventDefault();
    dispatch(showSpinner('Please wait'));
    AuthService.register(username, password, email)
      .then(async (response) => {
        const authentication = _.get(response, 'data.data.authentication', '');
        const user = _.get(response, 'data.data.user', '');
        const permissions = _.get(response, 'data.data.permissions', []);
        dispatch(authenticate(authentication, user, permissions));
        navigate('/login');
      })
      .catch((err) => {
        showError(err.response.data.message);
      })
      .finally(() => {
        dispatch(hideSpinner());
      });
  };

  return (
    <div>
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <Input
            label="Username"
            value={username}
            placeholder="Username"
            className="rounded-b-none"
            onChange={setUsername}
            extraClasses="xs:text-sm md:text-lg"
          />
          <div className="relative">
            <div className="w-full mt-2">
              <PasswordInput
                name="Password"
                label="Password"
                placeholder="Password"
                textSize="text-xs"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="relative">
            <div className="w-full mt-2">
              <Input
                name="Email"
                label="Email"
                placeholder="Email"
                textSize="text-xs"
                value={email}
                onChange={setEmail}
              />
            </div>
          </div>
          <div
            className="text-sm text-indigo-600 cursor-pointer py-3"
            onClick={() => navigate('/login')}>
            Login here!
          </div>
        </div>
        <DefaultButton md type="submit" label="Sign in" />
      </form>
    </div>
  );
};
export default RegisterForm;
