import React from "react";
import { urlFor } from "../lib/client";
import Link from "next/link";

import { Carousel } from "antd";

const HeroBanner = ({ slider }) => {
  const fetchSlide = (slide) => {
    const {
      _id,
      productLink,
      category,
      product,
      description,
      price,
      primaryButton,
      secondaryButton,
    } = slide;

    const slideStyle = {
      width: "100%",
      display: "flex",
      alignItems: "center",
    };
    const image = urlFor(slide.image);
    return (
      <div key={_id} className='slide' style={slideStyle}>
        <div className='left'>
          <h1 className='extraLarge'>{category}</h1>
          <h1 className='title'>{product}</h1>
          <p className='price'>${price}</p>

          <p className='desc'>{description}</p>
          <div className='controls'>
            <Link href='/#products'>
              <button className='secondaryBtn'>{secondaryButton}</button>
            </Link>
            <Link href={`/products/${productLink}`}>
              <button className='primaryBtn'>{primaryButton}</button>
            </Link>
          </div>
        </div>
        <div className='right'>
          <img src={image} alt={product} />
        </div>
      </div>
    );
  };

  return (
    <div className='hero'>
      <Carousel>{slider.map((slide) => fetchSlide(slide))}</Carousel>
    </div>
  );
};

export default HeroBanner;
