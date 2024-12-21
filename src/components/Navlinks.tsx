import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

const links = [
  { id: 1, url: '/', text: 'Home' },
  { id: 2, url: 'about', text: 'About' },
  { id: 3, url: 'books', text: 'Books' },
  { id: 4, url: 'cart', text: 'Cart' },
  { id: 5, url: 'checkout', text: 'Checkout' },
  { id: 6, url: 'orders', text: 'Orders' },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
