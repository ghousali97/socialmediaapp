import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/authContext';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import TimeoutModal from './components/timeoutmodal/TimeoutModal';


function App() {
  const { user, logout } = useContext(AuthContext);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })



  function ProtecedtRoute({ children }) {

    const [showModal, setShowModal] = useState(false);

    const checkForInactivity = () => {
      const expireTime = localStorage.getItem("tokenExpiry");
      const inactivityTime = localStorage.getItem("inactivityExpiry");

      console.log("inactivity time:" + inactivityTime);

      if (Date.now() > expireTime || Date.now() > inactivityTime) {
        logout();
      }

      if (Date.now() > (inactivityTime - 5000)) {
        console.log("Inactive");
        setShowModal(true);
      }


    }
    const updateInactivityTime = () => {
      const inactivityTime = Date.now() + 300000;
      console.log("Updating inactivity time");
      localStorage.setItem('inactivityExpiry', JSON.stringify(inactivityTime));
    }


    useEffect(() => {
      const interval = setInterval(() => {
        checkForInactivity();
      }, 2000);

      //clears interval when the component unmounts
      return () => clearInterval(interval);
    });


    //update Expiry time on user activity
    useEffect(() => {
      window.addEventListener('click', updateInactivityTime);
      window.addEventListener('keypress', updateInactivityTime);
      window.addEventListener('scroll', updateInactivityTime);
      window.addEventListener('mousemove', updateInactivityTime);

      return () => {
        window.removeEventListener('click', updateInactivityTime);
        window.removeEventListener('keypress', updateInactivityTime);
        window.removeEventListener('scroll', updateInactivityTime);
        window.removeEventListener('mousemove', updateInactivityTime);

      }
    })

    const handleStayLoggedIn = () => {
      setShowModal(false);
      updateInactivityTime();

    }



    return user ? <div>
      <TimeoutModal showModal={showModal} handleStayLoggedIn={handleStayLoggedIn} />
      {children}
    </div> : <Navigate to='/login' />;
  }

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />

    },
    {
      path: '/register',
      element: <Register />

    },
    {
      path: '/',
      element: <ProtecedtRoute>
        <Home />
      </ProtecedtRoute>


    },
    {
      path: '/profile/:userId',
      element: <ProtecedtRoute>
        <Profile />
      </ProtecedtRoute>

    }
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>

  );
}

export default App;
