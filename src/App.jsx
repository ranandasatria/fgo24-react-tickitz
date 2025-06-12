import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import MovieDetail from './pages/MovieDetail';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import BuyTicket from './pages/BuyTicket';
import Checkout from './pages/Checkout';
import Ticket from './pages/Ticket';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import Profile from './pages/Profile';
import AddMovie from './pages/AddMovie';
import ListMovieAdmin from './pages/ListMovieAdmin';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const currentUser = useSelector((state) => state.auth.currentUser)
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />
  }
  return element
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/movie',
    element: <MoviePage />
  },
  {
    path: '/movie/:id',
    element: <MovieDetail />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />
  },
  {
    path: '/buyticket',
    element: <BuyTicket />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/ticket',
    element: <Ticket />
  },
  {
    path: '/profile',
    element: <ProtectedRoute element={<Profile />} />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />
  },
  {
    path: '/listmovie',
    element: <ProtectedRoute element={<ListMovieAdmin />} allowedRoles={['admin']} />
  },
  {
    path: '/addmovie',
    element: <ProtectedRoute element={<AddMovie />} allowedRoles={['admin']} />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App;