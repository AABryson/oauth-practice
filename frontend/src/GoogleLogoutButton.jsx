import React from 'react';
import { googleLogout } from '@react-oauth/google';

const GoogleLogoutButton = () => {
  const handleLogout = () => {
    googleLogout();
    console.log('Logged out');
    // Optionally, redirect the user or clear local state
    // For example, using React Router to redirect:
    // window.location.href = '/login';
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default GoogleLogoutButton;
