import React from "react";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton";
import { useCart } from "../services/cartContext";
import { client } from "../lib/client";
import { Divider, Table } from "antd";

const Checkout = ({ products }) => {
  const { cart } = useCart();
  const productsInCart = cart.map((el) => {
    const { price, name } = products.find((p) => p._id === el.id);
    return { ...el, price, name };
  });
  console.log(productsInCart);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <section className='cart'>
      <div className='container'>
        {cart.length > 0 ? (
          <>
            <div className='Wrapper'>
              <p className='info'>There are {cart.length} items in Cart</p>

              <Table dataSource={productsInCart} columns={columns} />
            </div>
            <div>
              <Divider />
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
                <PaypalCheckoutButton products={productsInCart} />
              </div>
            </div>
          </>
        ) : (
          <h4>No items in your shopping cart</h4>
        )}
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

export default Checkout;
