import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineHome } from "react-icons/ai";
import { useCart } from "../services/cartContext";

const Header = ({ origin }) => {
  const { cart } = useCart();
  // because of the hydration error, we're using useEffect
  // to avoid missmatching of the content
  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  useEffect(() => {
    setCount(cart.length);
  }, [cart.length]);
  return (
    <header className={`${origin} ${menuOpen && "open"}`}>
      <div className='container'>
        <Link href='/'>
          <a className='logo' onClick={toggleMenu}>
            ShopX
          </a>
        </Link>
        <nav>
          <div className='toggle-menu' onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className='navigation'>
            <li>
              <Link href='/'>
                <a className='active' onClick={toggleMenu}>
                  <AiOutlineHome /> <span>Home</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/cart'>
                <a className='badge-wrapper' onClick={toggleMenu}>
                  <AiOutlineShopping />
                  <span className='xs-show'>Cart</span>
                  <span className='badge-count'>{count}</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
