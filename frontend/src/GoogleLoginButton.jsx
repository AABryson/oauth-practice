import React, {useContext} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import ContextObject from './ContextObject'

const GoogleLoginButton = () => {
  const {authToken, setAuthToken} = useContext(ContextObject);
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        // Exchange the authorization code for tokens with your backend
        const response = await axios.post('http://localhost:3001/auth/google', {
          code: codeResponse.code,
        });

        console.log('Tokens:', response.data);
        // Handle the tokens received from your backend
        // For example, you might store them in local storage or state
        setAuthToken(response.data.access_token);
        console.log('setAuthToken', authToken)
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
      }
    },
    onError: errorResponse => console.error('Login Error:', errorResponse),
  });

  return (
    <button onClick={() => googleLogin()}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;