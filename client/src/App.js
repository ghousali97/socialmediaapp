import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'


function App() {
  const { user } = useContext(AuthContext);

  const queryClient = new QueryClient();



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
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>

  );
}

export default App;
