import "../styles/globals.css";
import "../styles/app.css";
import React from "react";
import { Layout } from "../components/index";
import { CartProvider } from "../services/cartContext";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
