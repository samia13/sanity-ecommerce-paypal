import Link from "next/link";

import React from "react";
import { urlFor } from "../lib/client";

export const Banner = ({ banner }) => {
  const image = urlFor(banner.image);
  return (
    <>
      <div className='left'>
        <h4>{banner.product}</h4>
        <h3>${banner.price}</h3>
      </div>
      <div className='middle'>
        <picture>
          <source srcSet={image} type='image/webp' />
          <img src={image} alt={banner.product} />
        </picture>
      </div>
      <div className='right'>
        <h1>{banner.discount} OFF</h1>
        <p>{banner.description}</p>
        <Link href={`/products/${banner.productLink}`}>
          <a className='btn-banner'>{banner.primaryButton}</a>
        </Link>
      </div>
    </>
  );
};
