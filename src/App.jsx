import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import MovieDetail from './pages/MovieDetail';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import BuyTicket from './pages/BuyTicket';

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
    path: '/buyticket',
    element: <BuyTicket />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;