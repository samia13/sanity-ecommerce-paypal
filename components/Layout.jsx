import React from "react";
import Head from "next/head";
import { Header, Footer } from "./index";
import { useRouter } from "next/router";

export const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Ecommerce App</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header origin={router.pathname === "/" ? "homePage" : "pages"} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
