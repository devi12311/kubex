import Axios from 'axios';
import { store } from '@redux/Store';
import _ from 'lodash';
import { authenticate, logout } from '@redux/authentication/Action';
import { API_URL } from '@constants/index';
import localStorage from 'redux-persist/es/storage';

let isTokenRefreshing = false;
let failedRequests = [];

const API = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

const TokenAPI = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

const processFailedRequests = (error, accessToken) => {
  failedRequests.forEach((promise) => {
    return error ? promise.reject(error) : promise.resolve(accessToken);
  });
  failedRequests = [];
};

const getAuth = () => {
  const state = store.getState();
  const accessToken = _.get(state, 'authenticationReducer.accessToken', null);
  if (!accessToken) {
    return null;
  }
  return `Bearer ${accessToken}`;
};

API.interceptors.request.use(
  (config) => {
    const authentication = getAuth();

    if (authentication) {
      config.headers.Authorization = authentication;
    }
    return config;
  },
  async () => {
    const { dispatch } = store;
    await dispatch(logout());
    window.location.reload();
  }
);

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isTokenRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return API(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isTokenRefreshing = true;

      if (originalRequest.headers.Authorization !== getAuth()) {
        originalRequest.headers.Authorization = getAuth();
        return Promise.resolve(API(originalRequest));
      }

      const state = store.getState();
      const refreshToken = _.get(state, 'authenticationReducer.refresh_token', null);

      return new Promise((resolve, reject) => {
        TokenAPI.post('/api/refresh', { refreshToken })
          .then((response) => {
            const auth = response.data.data.authentication;
            const { dispatch } = store;
            dispatch(authenticate(auth));
            processFailedRequests(null, auth.access_token);
            resolve(API(originalRequest));
          })
          .catch(async (error) => {
            processFailedRequests(error, null);
            const { dispatch } = store;
            await dispatch(logout());
            reject(error);
          })
          .finally(() => {
            isTokenRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export default API;
