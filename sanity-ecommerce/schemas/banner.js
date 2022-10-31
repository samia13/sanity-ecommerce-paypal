export default {
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "productLink",
      title: "Product Link",
      type: "string",
    },
    {
      name: "product",
      title: "Product",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "primaryButton",
      title: "PrimaryButton",
      type: "string",
    },
    {
      name: "secondaryButton",
      title: "SecondaryButton",
      type: "string",
    },
    {
      name: "sentence",
      title: "sentence",
      type: "string",
    },

    {
      name: "discount",
      title: "Discount",
      type: "string",
    },
  ],
};
