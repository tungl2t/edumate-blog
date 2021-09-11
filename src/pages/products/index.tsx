import { GetStaticPropsContext } from 'next';
import { Flex } from '@chakra-ui/react';

import { getPageByPath, getProducts } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { getFormatImages } from '@/lib/helper';
import ProductType from '@/types/product.type';
import PageType from '@/types/page.type';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import ProductPreview from './components/product-preview';

type Props = {
  products: ProductType[];
  page: PageType;
};
const Index = ({ products, page }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/products"
        imageUrl={page.coverImage.small}
      />
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {products.map((product, index) => (
          <ProductPreview product={product} key={index} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const products = (await getProducts(locale)) || [];
  const data = await getPageByPath('/products', locale);
  return {
    props: {
      products: await Promise.all(
        products.map(async (product: ProductType) => {
          const specifications = await markdownToHtml(product.specifications);
          return {
            ...product,
            specifications,
            coverImage: getFormatImages(product?.coverImage?.url),
          };
        }),
      ),
      page: {
        ...data.pages[0],
        coverImage: getFormatImages(data.pages[0]?.coverImage?.url),
      },
    },
  };
};
