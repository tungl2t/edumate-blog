import { FormatImages } from './shared';

type ProductType = {
  name: string;
  specifications: string;
  coverImage: FormatImages;
  productCategory: {
    name: string;
  };
};

export default ProductType;
