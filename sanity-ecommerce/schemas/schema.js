import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import product from "./product";
import banner from "./banner";
import slider from "./slider";
import category from "./category";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([product, banner, slider, category]),
});
