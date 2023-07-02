import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  console.log(darkMode);



  function ProtecedtRoute({ children }) {

    return user ? children : <Navigate to='/login' />;
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
      path: '/profile',
      element: <ProtecedtRoute>
        <Profile />
      </ProtecedtRoute>

    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
