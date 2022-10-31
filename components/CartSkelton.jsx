import { Skeleton } from "antd";
import React from "react";

const CartSkelton = () => (
  <Skeleton
    className='mb-20'
    avatar
    paragraph={{
      rows: 2,
    }}
  />
);
export default CartSkelton;
