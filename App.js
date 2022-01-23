import React from 'react';
import Router from './router'
import { AuthProvider } from './services/auth.service';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;