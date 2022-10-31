import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import Product from "../../components/Product";
import Slider from "react-slick";
import { Rate } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../../services/cartContext";
import Link from "next/link";

const ProductDetail = ({ similarProducts, singleProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const SliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
  };
  const { _id, name, price, image, description, category } = singleProduct;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div>
      <section className='product-detail'>
        <div className='container'>
          <div className='content'>
            <div
              className='images'
              style={{
                display: "flex",
                marginRight: "20px",
                marginBottom: "20px",
              }}
            >
              {image.length > 0 && (
                <div className='thumbnails'>
                  {image.map((img, index) => {
                    let src = urlFor(img);
                    return (
                      <img
                        key={index}
                        style={{
                          height: "150px",
                          maxWidth: "100%",
                          marginBottom: "10px",
                          background: "whitesmoke",
                          objectFit: "cover",
                          cursor: "pointer",
                          filter:
                            currentImageIndex == index
                              ? "opacity(0.5)"
                              : "unset",
                        }}
                        src={src}
                        alt={`${name} image ${index}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    );
                  })}
                </div>
              )}
              <img
                className='mainImage'
                src={urlFor(image[currentImageIndex])}
                alt={name}
              />
            </div>

            <div className='detail'>
              <h2>{name}</h2>
              <Rate allowHalf defaultValue={3.5} />
              <h2>${price}</h2>
              <p>{description}</p>
              <div className='quantity'>
                <select
                  aria-label={`Select quantity for ${name}`}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  <option disabled>Select Quantity</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
              <div className='buttons'>
                <button
                  className='btn-primary'
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    dispatch({ type: "add", id: _id, quantity });
                    toast.success("Successfully Added!");
                  }}
                >
                  Add To Cart
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='products detail'>
        <div className='container'>
          <h2>Similar Products</h2>
          <p>You may also like</p>
          <div className='products-grid'>
            <Slider {...SliderSettings}>
              {similarProducts &&
                similarProducts
                  .filter((el) => el._id !== _id)
                  .map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductDetail;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, price, image, description, category->
  }`;
  const singleProduct = await client.fetch(query);

  const category = await singleProduct.category.slug.current;
  const productsQuery = `*[_type == "product" && category->slug.current == '${category}']`;
  const similarProducts = await client.fetch(productsQuery);

  return {
    props: { similarProducts, singleProduct },
  };
};
