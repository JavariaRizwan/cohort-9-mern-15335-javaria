import {React, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';



import Home from './components/Home';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Middle from './components/Middle';
import NotFound from './components/NotFound';
import ProtectedRoute from './Auth/ProtectedRoute';
import UserProfile from './components/UserProfile';
// import SplashScreen from './components/SplashScreen';



const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user-notes', {
          withCredentials: true,
        });

        if (response.data.success) {
          navigate('/user_dashboard');
        }
      } catch (error) {
        console.error("No active session found", error.message);
      }
    };

    checkExistingSession();
  }, [navigate]);




// const [showSplash, setShowSplash] = useState(true);

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }

  const handleLoginSuccess = () => {
    toast.success('Successfully logged in!');
    navigate('/user_dashboard');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      <Toaster position="top-right" />
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

         
          <Route element={<ProtectedRoute />}>
        <Route 
          path="/user_dashboard" 
          element={<Middle onLogout={handleLogout} />} 
        />
        
         <Route path='/user-profile' element={<UserProfile />} />
        
        </Route>
      <Route 
          path="*" 
          element={<NotFound />} 
        />
      
      </Routes>
    </>
  );
};

export default App;