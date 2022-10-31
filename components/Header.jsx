import React, { useEffect, useState } from "react";
import { AiOutlineShopping, AiOutlineHome } from "react-icons/ai";
import { useCart } from "../services/cartContext";

const Header = ({ origin }) => {
  const { cart } = useCart();
  // because of the hydration error, we're using useEffect
  // to avoid missmatching of the content
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(cart.length);
  }, [cart.length]);
  return (
    <header className={origin}>
      <div className='container'>
        <a href='/' className='logo'>
          ShopX
        </a>
        <nav>
          <div className='toggle-menu'>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul>
            <li>
              <a className='active' href='/'>
                <AiOutlineHome /> <span>Home</span>
              </a>
            </li>
            <li>
              <a href='/cart' className='badge-wrapper'>
                <AiOutlineShopping />
                <span className='xs-show'>Cart</span>
                <span className='badge-count'>{count}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
