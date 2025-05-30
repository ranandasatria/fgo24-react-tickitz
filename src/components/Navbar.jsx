import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from './Button';
import { logoutAction } from '../redux/reducers/auth';

function Navbar() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const username = currentUser?.name || currentUser?.email?.split('@')[0] || ''

  const handleLogout = () => {
    dispatch(logoutAction())
    setIsDropdownOpen(false)
  }

  return (
    <div className="flex w-full">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <NavLink to="/" end>
          <img src="/assets/tickitznav.svg" alt="Tickitz Logo" className="h-8" />
        </NavLink>
        <div className="hidden gap-8 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-base font-semibold ${
                isActive ? 'text-black' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                HOME
                <div
                  className={`h-2 w-2 rounded-full ${
                    isActive ? 'bg-orange-500' : 'bg-transparent'
                  }`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="/movie"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-base font-semibold ${
                isActive ? 'text-black' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                MOVIE
                <div
                  className={`h-2 w-2 rounded-full ${
                    isActive ? 'bg-orange-500' : 'bg-transparent'
                  }`}
                />
              </>
            )}
          </NavLink>
          <NavLink
            to="/buyticket"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-base font-semibold ${
                isActive ? 'text-black' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                BUY TICKET
                <div
                  className={`h-2 w-2 rounded-full ${
                    isActive ? 'bg-orange-500' : 'bg-transparent'
                  }`}
                />
              </>
            )}
          </NavLink>
        </div>
         <div className="flex gap-2 relative">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="body-2-bold flex items-center justify-center px-5 py-3 rounded-2xl bg-neutral-50 text-black hover:bg-orange-600 hover:text-white border border-orange-600 cursor-pointer"
              >
                {username}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-orange-600 rounded shadow-lg z-10">
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 rounded cursor-pointer"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 rounded cursor-pointer"
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
      </nav>
    </div>
  )
}

export default Navbar;