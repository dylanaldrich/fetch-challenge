/* Backend server URL */
const URL = 'https://frontend-take-home-service.fetch.com';

export interface UserData {
  name: string;
  email: string;
}

class AuthModel {
  static login = (userData: UserData) => {
    return fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then((response) => response.json());
  };

  static logout = () => {
    return fetch(`${URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  };
}

export default AuthModel;
