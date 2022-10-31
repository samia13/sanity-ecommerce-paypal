import React from "react";
import { client } from "../../lib/client";
import Product from "../../components/Product";

const CategoryDetail = ({ category, products }) => {
  return (
    <div>
      <section className='products'>
        <div className='container'>
          <h2>{category.title}</h2>
          <p>Find the top in demand products for {category.title}</p>
          {products.length > 0 ? (
            <div className='products-grid'>
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  transition='translateY'
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>We are out of stock for the moment, Coming soon ..</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default CategoryDetail;

export async function getStaticPaths() {
  const query = `*[_type == "category"] {
    slug {
      current
    }
  }
  `;
  const categories = await client.fetch(query);

  const paths = categories.map((cat) => ({
    params: { catSlug: cat.slug.current },
  }));
  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params: { catSlug } }) => {
  const categoryQuery = `*[_type == "category" && slug.current == '${catSlug}'][0]`;
  const category = await client.fetch(categoryQuery);

  let productQuery = `*[_type == "product" && category->slug.current == '${catSlug}']`;
  const products = await client.fetch(productQuery);

  return {
    props: { category, products },
  };
};
