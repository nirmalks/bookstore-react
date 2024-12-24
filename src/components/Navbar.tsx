import { NavLink, useNavigate } from 'react-router';
import NavLinks from './Navlinks';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../features/user/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    navigate('/');
    dispatch(logoutUser());
  };
  return (
    <div className="navbar align-element">
      <div className="navbar-start">
        <NavLink
          to="/"
          className="hidden lg:flex btn btn-primary text-3xl items-center"
        >
          Books
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Login
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Register
            </Link>
          </div>
        )}
        <ul className="menu menu-horizontal">
          <NavLinks></NavLinks>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
