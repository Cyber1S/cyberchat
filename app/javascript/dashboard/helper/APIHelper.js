import Auth from '../api/auth';

const parseErrorCode = error => Promise.reject(error);

export default axios => {
  const { apiHost = '' } = window.cyber1schatConfig || {};
  const c1chatApi = axios.create({ baseURL: `${apiHost}/` });
  // Add Auth Headers to requests if logged in
  if (Auth.hasAuthCookie()) {
    const {
      'access-token': accessToken,
      'token-type': tokenType,
      client,
      expiry,
      uid,
    } = Auth.getAuthData();
    Object.assign(c1chatApi.defaults.headers.common, {
      'access-token': accessToken,
      'token-type': tokenType,
      client,
      expiry,
      uid,
    });
  }
  // Response parsing interceptor
  c1chatApi.interceptors.response.use(
    response => response,
    error => parseErrorCode(error)
  );
  return c1chatApi;
};
