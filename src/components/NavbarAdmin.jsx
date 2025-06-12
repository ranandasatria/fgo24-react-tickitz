import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from './Button';
import { logoutAction } from '../redux/reducers/auth';

function NavbarAdmin() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const username = currentUser?.name || currentUser?.email?.split('@')[0] || '';

  const handleLogout = () => {
    dispatch(logoutAction());
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex w-full">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 sm:py-3 md:px-6">
        <NavLink to="/" end>
          <img src="/assets/tontrix-high-resolution-logo-transparent.png" alt="Tontrix Logo" className="h-6 sm:h-8 md:h-10" />
        </NavLink>
        <div className="hidden gap-6 md:gap-8 md:flex">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-sm sm:text-base md:text-lg font-semibold ${
                isActive ? 'text-black' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                Dashboard
                <div
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                    isActive ? 'bg-primary-500' : 'bg-transparent'
                  }`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="/listmovie"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-sm sm:text-base md:text-lg font-semibold ${
                isActive ? 'text-black' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                Movie
                <div
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                    isActive ? 'bg-primary-500' : 'bg-transparent'
                  }`}
                />
              </>
            )}
          </NavLink>
          {/* <NavLink
            to="/buyticket"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-sm sm:text-base md:text-lg font-semibold ${
                isActive ? 'text-black' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                BUY TICKET
                <div
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                    isActive ? 'bg-primary-500' : 'bg-transparent'
                  }`}
                />
              </>
            )}
          </NavLink> */}
        </div>
        <div className="hidden md:flex gap-1.5 sm:gap-2 relative">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="body-2-bold flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-neutral-50 text-black hover:bg-primary-600 hover:text-white border border-primary-600 cursor-pointer text-sm sm:text-base md:text-lg"
              >
                {username}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 bg-white border border-primary-600 rounded shadow-lg z-10">
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-gray-700 hover:bg-primary-50 rounded cursor-pointer text-xs sm:text-sm md:text-base"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-gray-700 hover:bg-primary-50 rounded cursor-pointer text-xs sm:text-sm md:text-base"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="secondary" to="/signup">
                Sign Up
              </Button>
              <Button variant="primary" to="/login">
                Login
              </Button>
            </>
          )}
        </div>
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col w-full bg-white border-t border-gray-200 absolute top-12 sm:top-16 z-20">
          <div className="flex flex-col gap-4 px-4 py-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm sm:text-base font-semibold px-2 py-1 ${isActive ? 'text-black' : 'text-gray-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/movie"
              className={({ isActive }) =>
                `text-sm sm:text-base font-semibold px-2 py-1 ${isActive ? 'text-black' : 'text-gray-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Movie
            </NavLink>
            {/* <NavLink
              to="/buyticket"
              className={({ isActive }) =>
                `text-sm sm:text-base font-semibold px-2 py-1 ${isActive ? 'text-black' : 'text-gray-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              BUY TICKET
            </NavLink> */}
            {currentUser ? (
              <div className="flex flex-col gap-2 border-t border-gray-200 pt-2">
                <Link
                  to="/profile"
                  className="text-sm sm:text-base font-semibold px-2 py-1 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm sm:text-base font-semibold px-2 py-1 text-gray-600 text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 border-t border-gray-200 pt-2">
                <Button variant="secondary" to="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Button>
                <Button variant="primary" to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarAdmin;