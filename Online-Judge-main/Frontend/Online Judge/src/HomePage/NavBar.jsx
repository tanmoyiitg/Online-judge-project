import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for hamburger menu

const URL = process.env.VITE_BACKEND_URL;

function NavBar() {
  const location = useLocation();
  const [showUser, setShowUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const UserDetailsRef = useRef();
  const UserIconRef = useRef();

  useEffect(() => {
    const externalElement = document.querySelector('#root');
    externalElement.style.padding = 0;
    return () => {
      externalElement.style.padding = '';
    };
  }, []);

  useEffect(() => {
    if (user) {
      const array = user.roles;
      const roles = array.includes(1984);
      if (roles) {
        setIsAdmin(true);
      }
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`${URL}/api/auth/profile`, { withCredentials: true })
      .then((response) => {
        setUser({
          email: response.data.user.username,
          id: response.data.user.id,
          roles: response.data.user.roles,
        });
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .post(`${URL}/api/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch((error) => console.error('Error logging out:', error));
  };

  const handleUserVisibility = () => {
    setShowUser(!showUser);
  };

  const handleClickOutside = (event) => {
    if (
      UserDetailsRef.current &&
      !UserIconRef.current.contains(event.target) &&
      !UserDetailsRef.current.contains(event.target)
    ) {
      setShowUser(false);
    }
  };

  useEffect(() => {
    if (showUser) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUser]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex justify-between items-center w-full bg-slate-800 border-b-2 border-t-4 h-[3rem] p-4">
      <div className="flex justify-between items-center w-full md:w-[80%]  lg:w-[70%] ">
        <p className="text-white">CodeSmash</p>
        <div className="md:hidden">
          <div
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none focus:border-none bg-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
        <ul className="hidden md:flex gap-5  mb-2 font-semibold justify-center items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contest"
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
              }
            >
              Contest
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/problemSet"
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
              }
            >
              Problemset
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              state={{ from: location }}
              replace
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
              }
            >
              Feedback
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedbackResponse"
              state={{ from: location }}
              replace
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer ${isAdmin ? 'block' : 'hidden'}`
              }
            >
              Feedback Response
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/problemForm"
              state={{ from: location }}
              replace
              className={({ isActive }) =>
                `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer ${isAdmin ? 'block' : 'hidden'}`
              }
            >
              Add Problem
            </NavLink>
          </li>
          
        </ul>
      </div>

      <ul className="hidden md:flex gap-3">
        {user ? (
          <>
            <li
              onClick={handleUserVisibility}
              className="relative cursor-pointer"
            >
              <img
                ref={UserIconRef}
                src="/user.png"
                alt="User Icon"
                className="h-[25px] w-[25px] mr-10"
              />
            </li>
            {showUser && (
              <div
                ref={UserDetailsRef}
                className="h-[10rem] w-auto border-2 rounded-md bg-blue-200 absolute z-20 p-2"
                style={{ right: '30px', top: '20%', transform: 'translateY(-50%)' }}
              >
                <ul className="cursor-pointer">
                  <li className="flex m-0">
                    <img
                      src="/user.png"
                      alt="User"
                      className="h-[25px] w-[25px] mr-2"
                    />
                    {user.email}
                  </li>
                  <li className="flex mt-3">
                    <img
                      src="/exit.png"
                      alt="Sign Out"
                      className="h-[25px] w-[25px] mr-2"
                    />
                    <div onClick={handleLogout}>Sign Out</div>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                state={{ from: location }}
                replace
                className="text-gray-500"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="text-gray-500">
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[3rem] left-0 w-full bg-slate-800 p-4 z-20">
          <div className='flex justify-between'>
          <ul className="flex flex-col gap-3 font-semibold ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
                }
                onClick={toggleMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contest"
                className={({ isActive }) =>
                  `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
                }
                onClick={toggleMobileMenu}
              >
                Contest
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/problemSet"
                className={({ isActive }) =>
                  `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
                }
                onClick={toggleMobileMenu}
              >
                Problemset
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
                }
                onClick={toggleMobileMenu}
              >
                Feedback
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feedbackResponse"
                className={({ isActive }) =>
                  `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
                }
                onClick={toggleMobileMenu}
              >
                Feedback Response
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink
                  to="/problemForm"
                  state={{ from: location }}
                  replace
                  className={({ isActive }) =>
                    `${isActive ? 'text-orange-400' : 'text-gray-500'} cursor-pointer`
                  }
                  onClick={toggleMobileMenu}
                >
                  Add Problem
                </NavLink>
              </li>
            )}
            </ul>
            <ul className='flex flex-col gap-3 font-semibold'>
            {user ? (
              <>
                <li className="flex items-center gap-2 text-gray-500">
                  <img
                    src="/user.png"
                    alt="User"
                    className="h-[25px] w-[25px]"
                  />
                  {user.email}
                </li>
                <li className="flex items-center gap-2 cursor-pointer text-gray-500" onClick={handleLogout}>
                  <img
                    src="/exit.png"
                    alt="Sign Out"
                    className="h-[25px] w-[25px]"
                  />
                  Sign Out
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    state={{ from: location }}
                    replace
                    className="text-gray-500"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="text-gray-500"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
