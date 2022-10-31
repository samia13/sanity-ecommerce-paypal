import React, { useEffect, useState } from "react";
import Link from "next/link";
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
        <Link href='/'>
          <a className='logo'>ShopX</a>
        </Link>
        <nav>
          <div className='toggle-menu'>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul>
            <li>
              <Link href='/'>
                <a className='active'>
                  <AiOutlineHome /> <span>Home</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/cart'>
                <a className='badge-wrapper'>
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
