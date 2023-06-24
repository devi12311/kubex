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
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = (e) => {
    if ((!username, !password)) {
      showError('Please enter your data');
    }
    e.preventDefault();
    dispatch(showSpinner(t('pleaseWait')));
    AuthService.login(username, password)
      .then(async (response) => {
        console.log(response);
        const authentication = _.get(response, 'data.auth', '');
        const user = _.get(response, 'data.data.user', '');
        const permissions = _.get(response, 'data.data.permissions', []);
        dispatch(authenticate(authentication, user, permissions));
        navigate('/');
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
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
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
                name="password"
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
          <div
            className="text-sm text-indigo-600 cursor-pointer py-3"
            onClick={() => navigate('/register')}>
            Register here!
          </div>
        </div>
        <DefaultButton md type="submit" label="Sign in" />
      </form>
    </div>
  );
};

export default LoginForm;
