import { GetStaticPropsContext } from 'next';
import { AspectRatio, Box, Flex, Heading, Img } from '@chakra-ui/react';

import { getPageByPath } from '@/lib/api';
import { getFormatImages } from '@/lib/helper';
import markdownToHtml from '@/lib/markdownToHtml';
import PageType from '@/types/page.type';
import CompanyType from '@/types/company.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';

type Props = {
  companies: CompanyType[];
  page: PageType;
};
const Index = ({ page }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/about-us"
        imageUrl={page.coverImage.small}
      />
      <Flex
        direction={{ base: 'column', md: 'row-reverse' }}
        m="auto"
        w={{ base: '95%', lg: '960px' }}
        border={{ base: '1px solid #000', md: 'none' }}
        borderColor="gray.200"
      >
        <AspectRatio ratio={{ base: 4 / 3, md: 3 / 4 }} flex={{ base: '100%', md: '40%' }}>
          <Img src={page.coverImage.url} alt={page.name} />
        </AspectRatio>

        <Box
          position="relative"
          display="flex"
          flex={{ base: '100%', md: '60%' }}
          flexDirection="column"
          justifyContent="center"
          m={{ base: 'unset', md: 'auto' }}
          p={{ base: '1.25em', sm: '1.5em' }}
        >
          <Heading size="md" color="blue.800">
            {page.name}
          </Heading>
          <Box
            fontSize="16px"
            color="gray.600"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const data = await getPageByPath('/about-us', locale);
  const page = data.pages[0] as PageType;
  const content = await markdownToHtml(page?.content ?? '');
  return {
    props: {
      page: {
        ...page,
        content,
        coverImage: getFormatImages(page?.coverImage?.url),
      },
    },
  };
};
