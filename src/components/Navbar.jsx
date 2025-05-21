import { NavLink } from 'react-router-dom';
import Button from './Button';

function Navbar() {
  return (
    <div className="flex w-full">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <img src="/assets/tickitznav.svg" alt="Tickitz Logo" className="h-8" />
        <div className="hidden gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'text-black' : 'text-gray-600'}`
            }
          >
            <span className="text-base font-semibold">HOME</span>
            {({ isActive }) => (isActive ? <div className="h-2 w-2 rounded-full bg-orange-500" /> : null)}
          </NavLink>
          <NavLink
            to="/movie"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'text-black' : 'text-gray-600'}`
            }
          >
            <span className="text-base font-semibold">MOVIE</span>
            {({ isActive }) => (isActive ? <div className="h-2 w-2 rounded-full bg-orange-500" /> : null)}
          </NavLink>
          <NavLink
            to="/buyticket"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'text-black' : 'text-gray-600'}`
            }
          >
            <span className="text-base font-semibold">BUY TICKET</span>
            {({ isActive }) => (isActive ? <div className="h-2 w-2 rounded-full bg-orange-500" /> : null)}
          </NavLink>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" to="/signup">
            Sign Up
          </Button>
          <Button variant="primary" to="/login">
            Login
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;