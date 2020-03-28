import { AUTH_SERVER_URL } from '../const/const';

export const authenticate = (userpassword) => {
  const stringifiedBody = JSON.stringify(userpassword);

  const options = {
    method: 'POST',
    body: stringifiedBody,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${AUTH_SERVER_URL}/login`, options).then(authenticationHandler);
}

const authenticationHandler = (data) => data.ok ? data.json() : data.text();
