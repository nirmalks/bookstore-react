import { NavLink } from 'react-router';
import NavLinks from './Navlinks';

const Navbar = () => {
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
        <ul className="menu menu-horizontal">
          <NavLinks></NavLinks>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
