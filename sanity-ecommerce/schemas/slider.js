export default {
  name: "slider",
  title: "Slider",
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
      name: "category",
      title: "Category",
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
      type: "text",
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
      name: "largeText",
      title: "LargeText",
      type: "string",
    },
  ],
};
