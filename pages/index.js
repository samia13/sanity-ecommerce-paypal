import React from "react";
import { HeroBanner, Category, Product, Banner } from "../components";
import { client } from "../lib/client";

const Index = ({ products, slider, categories, banner }) => {
  return (
    <>
      <HeroBanner slider={slider} />
      <section className='categories' id='categories'>
        <div className='container'>
          <div className='left'>
            <h2 className='section-heading'>Shop By Category</h2>
            <p>All you need for a nice clean setup</p>
          </div>
          <div className='categories-grid'>
            {categories.map((category) => (
              <Category key={category._id} category={category} />
            ))}
          </div>
        </div>
      </section>
      <section className='products' id='products'>
        <div className='container'>
          <h2>Our Best Selling products</h2>
          <p>Find the top in demand products in our shop</p>
          <div className='products-grid'>
            {products.slice(0, 4).map((product) => (
              <Product
                key={product._id}
                product={product}
                transition='translateY'
              />
            ))}
          </div>
        </div>
      </section>
      <section className='banner'>
        <div className='container'>
          <Banner banner={banner[0]} />
        </div>
      </section>
    </>
  );
};

// fetch Data from Sanity CMS
export const getServerSideProps = async () => {
  let productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  let bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  let HeroQuery = '*[_type == "slider"]';
  const slider = await client.fetch(HeroQuery);

  let CategoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(CategoryQuery);

  return { props: { products, slider, categories, banner } };
};

export default Index;
