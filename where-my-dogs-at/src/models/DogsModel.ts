/* Backend server URL */
const URL = 'https://frontend-take-home-service.fetch.com';

export interface UserData {
  name: string;
  email: string;
}

interface AuthResponse {
  ok: boolean;
}

class AuthModel {
  static login = async (userData: UserData) => {
    const response: AuthResponse = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Login attempt failed. Please try again.');
    }

    return { userName: userData.name };
  };

  static logout = async () => {
    const response = await fetch(`${URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout unsuccessful. Please try again.');
    }

    return true;
  };
}

export default AuthModel;
