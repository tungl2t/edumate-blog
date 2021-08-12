import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { Box, Button, Flex, Img, Text } from '@chakra-ui/react';

import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import HomePreview from './_components/home-preview';
import { getHomeContent } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import HomeType from '@/types/home.type';

type Props = {
  homes: HomeType[];
};
const Index = ({ homes }: Props) => {
  const t = useTranslations('Home');
  return (
    <Layout>
      {/*<MyMeta*/}
      {/*  title={t('title')}*/}
      {/*  description={t('desc')}*/}
      {/*  url="https://edumate.vn"*/}
      {/*  imageUrl="/edumate.png"*/}
      {/*/>*/}
      <Box position="relative" w="100%" h="calc(100vh - 60px)">
        <Img
          src="/images/home.jpeg"
          w="100%"
          h="100%"
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
          <Text
            fontSize={{ base: '1.5em', md: '1.75em' }}
            padding="0 0.5em"
            textTransform="uppercase"
            color="gray.700"
            textAlign="center"
          >
            {t('title')}
          </Text>
          <NextLink href="/services">
            <Button variant="outline" mt="0.5em" color="black" colorScheme="blue" size="sm">
              {t('explore')}
            </Button>
          </NextLink>
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

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const homes = (await getHomeContent(locale)) || [];
  return {
    props: {
      homes: await Promise.all(
        homes.map(async (home: HomeType) => {
          const content = await markdownToHtml(home.content);
          return {
            ...home,
            content,
            coverImage: {
              url: `${process.env.CMS_URL}${home?.coverImage?.url ?? ''}`,
            },
          };
        }),
      ),
    },
  };
};
