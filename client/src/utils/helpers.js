import { notify } from 'react-notify-toast';

export const showSuccess = (message = 'Success', timeout = 4000) => {
  notify.show(message, 'custom', timeout, {
    background: '#10b981',
    text: 'white'
  });
};
export const showCopiedFlash = (message = 'Success', timeout = 800) => {
  notify.show(message, 'custom', timeout, {
    background: '#EC7F00',
    text: 'white'
  });
};

export const showError = (error, timeout = 4000) => {
  notify.show(error, 'custom', timeout, {
    background: '#ef4444',
    text: 'white'
  });
};

export const showInfo = (message, timeout = 2000) => {
  notify.show(message, 'custom', timeout, {
    background: '#3b82f6',
    text: 'white'
  });
};

export const numbersOnly = (value) => {
  return value.replace(/[^0-9.]/g, '');
};

export const wait = (ms = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
