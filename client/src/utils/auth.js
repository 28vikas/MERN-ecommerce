
import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token;
};

export const setAuthToken = (token) => {
  Cookies.set('token', token, { expires: 1 }); 
};

export const removeAuthToken = () => {
  Cookies.remove('token');
};
