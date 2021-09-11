import { GetStaticPropsContext } from 'next';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { Box, Button, Flex, Heading, Img } from '@chakra-ui/react';

import { getHomeContent, getPageByPath } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { getFormatImages } from '@/lib/helper';
import HomeType from '@/types/home.type';
import PageType from '@/types/page.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import HomePreview from './_components/home-preview';

type Props = {
  homes: HomeType[];
  page: PageType;
};
const Index = ({ homes, page }: Props) => {
  const t = useTranslations('Home');
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/"
        imageUrl={page.coverImage.small}
      />
      <Box position="relative" w="100%" h="calc(100vh - 60px)">
        <Img
          src={page.coverImage.url}
          w="100%"
          h="100%"
          alt={page.name}
          position="absolute"
          top={0}
          right={0}
          objectFit="cover"
        />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          w="100%"
          h="100%"
        >
          <Flex direction="column" p={5} justifyContent="center" alignItems="center" mx={2}>
            <Heading
              fontSize={{ base: '1.5em', md: '1.75em' }}
              padding="0 0.5em"
              textTransform="uppercase"
              color="gray.700"
              textAlign="center"
            >
              {t('title')}
            </Heading>
            <NextLink href="/services">
              <Button
                variant="outline"
                mt="0.5em"
                color="gray.700"
                colorScheme="blue"
                size="sm"
                width={200}
              >
                {t('explore')}
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {homes.map((home, index: number) => (
          <HomePreview home={home} key={index} index={index} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const homes = (await getHomeContent(locale)) || [];
  const data = await getPageByPath('/', locale);
  return {
    props: {
      homes: await Promise.all(
        homes.map(async (home: HomeType) => {
          const content = await markdownToHtml(home.content);
          return {
            ...home,
            content,
            coverImage: getFormatImages(home?.coverImage?.url),
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
