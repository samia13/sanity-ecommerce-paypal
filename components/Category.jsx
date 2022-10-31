import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Category = ({ category }) => {
  const image = urlFor(category.image);
  return (
    <Link href={`/categories/${category.slug.current}`}>
      <div className='category'>
        <img
          style={{ height: "300px", objectFit: "cover" }}
          src={image}
          alt={category.title}
        />
        <h4>{category.title}</h4>
      </div>
    </Link>
  );
};

export default Category;
