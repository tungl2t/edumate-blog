type ProductType = {
  name: string;
  specifications: string;
  coverImage: {
    url: string;
    small: string;
    medium: string;
    large: string;
    thumbnail: string;
  };
  productCategory: {
    name: string;
  };
};

export default ProductType;
