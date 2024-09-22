// import HttpService from 'utils/http';
import { LoginReq } from '../model/LoginModel';
import { saveAccessToken } from 'utils/jwt';

export const login = async (loginData: LoginReq) => {
  // Fake for FE pass Login:
  const { username, password } = loginData;
  if (username === 'admin@admin.com' && password === 'admin') {
    const token = 'testtokenloginapp';
    await saveAccessToken(token);
    return Promise.resolve(token);
  } else {
    return Promise.reject({ code: 401, data: null, message: ['Email/Password invalid'] });
  }
};
