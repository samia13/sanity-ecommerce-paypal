import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const Product = ({
  product: { image, name, price, slug },
  transition = null,
}) => {
  const source = urlFor(image[0]);
  const url = `/products/${slug.current}`;
  return (
    <div className={`product ${transition ?? transition}`}>
      <div className='image-wrapper'>
        <img src={source} alt={name} />
      </div>
      <Link href={url}>
        <h4>{name}</h4>
      </Link>
      <h6>${price}</h6>
    </div>
  );
};

export default Product;
