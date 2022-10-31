import React from "react";
import Link from "next/link";
import { useCart } from "../services/cartContext";
import { urlFor, client } from "../lib/client";
import { Divider } from "antd";

const Cart = ({ products }) => {
  const { cart, dispatch } = useCart();
  const productsInCart = cart.map((el) => {
    let price = products.find((p) => p._id === el.id).price;
    return { ...el, price };
  });
  function renderItem({ id, quantity }) {
    const { price, name, image } = products.find((p) => p._id == id);
    return (
      <li key={id} className='cart-item '>
        <picture>
          <source srcSet={urlFor(image[0])} type='image/webp' />
          <img
            className='mr-20'
            style={{
              height: "130px",
              width: "180px",
              objectFit: "cover",
              flexShrink: "0",
            }}
            src={urlFor(image[0])}
            alt={name}
          />
        </picture>
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <select
            aria-label={`Select quantity for ${name}`}
            onChange={(e) =>
              dispatch({
                type: "updateQuantity",
                quantity: parseInt(e.target.value),
                id,
              })
            }
            value={quantity}
          >
            <option disabled>Select Quatity</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <button
            onClick={() => {
              dispatch({ type: "delete", id });
            }}
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
  return (
    <section className='cart'>
      <div className='container'>
        {cart.length == 0 ? (
          <p>
            You haven&apos;t placed any order yet! <br />
            Please visit Home page <Link href='/#categories'>Here</Link>
          </p>
        ) : (
          <div className='Wrapper'>
            <p className='info'>There are {cart.length} items in Cart</p>
            <Divider />
            <ul>{cart.map(renderItem)}</ul>
          </div>
        )}
        <div>
          <Divider></Divider>
          {cart.length > 0 && (
            <>
              <h3>
                <span
                  style={{
                    padding: "10px 15px",
                    textTransform: "uppercase",
                    border: "1px solid #d7d7d7",
                  }}
                >
                  Total: $
                  {productsInCart.reduce(
                    (prev, curr) => prev + curr.price * curr.quantity,
                    0
                  )}
                </span>
              </h3>
              <br />

              <div className='buttons'>
                <Link href='/#categories'>
                  <a className='btn btn-secondary'>back to shopping</a>
                </Link>
                <Link href='/checkout'>
                  <a className='btn btn-primary'>Checkout</a>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async () => {
  let productQuery = `*[_type == "product"]`;
  const products = await client.fetch(productQuery);

  return {
    props: { products },
  };
};

export default Cart;
