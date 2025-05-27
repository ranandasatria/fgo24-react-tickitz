import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import MovieDetail from './pages/MovieDetail';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import BuyTicket from './pages/BuyTicket';
import Checkout from './pages/Checkout';
import Ticket from './pages/Ticket';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'


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
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/ticket',
    element: <Ticket />
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