import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import Home from './components/Home';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Middle from './components/Middle';
import NotFound from './components/NotFound';


const App = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    toast.success('Successfully logged in!');
    // Redirect cleanly to user dashboard upon login
    navigate('/user_dashboard');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onGetStarted={() => navigate('/signup')} 
              onSignIn={() => navigate('/signin')} 
            />
          } 
        />

        <Route 
          path="/signup" 
          element={<SignUp onSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/signin" 
          element={<SignIn onSuccess={handleLoginSuccess} />} 
        />

        <Route 
          path="/user_dashboard" 
          element={<Middle onLogout={handleLogout} />} 
        />
        <Route 
          path="*" 
          element={<NotFound />} 
        />
        
      </Routes>
    </>
  );
};

export default App;