import Layout from '@/components/layout';
import ProductType from '@/types/product.type';
import { getProducts } from '@/lib/api';
import { useTranslations } from 'next-intl';
import MyMeta from '@/components/my-meta';
import { Flex } from '@chakra-ui/react';
import ProductPreview from './components/product-preview';
import markdownToHtml from '@/lib/markdownToHtml';

type Props = {
  products: ProductType[];
};
const Index = ({ products }: Props) => {
  const t = useTranslations('Products');
  return (
    <Layout>
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn/products"
        imageUrl="https://edumate.vn/edumate.png"
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

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const products = (await getProducts(locale)) || [];
  return {
    props: {
      products: await Promise.all(
        products.map(async (product: ProductType) => {
          const specifications = await markdownToHtml(product.specifications);
          return {
            ...product,
            specifications,
            coverImage: {
              url: `${process.env.CMS_URL}${product?.coverImage?.url ?? ''}`,
            },
          };
        }),
      ),
    },
  };
};
