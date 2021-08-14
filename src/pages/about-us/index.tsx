import { AspectRatio, Box, Flex, Heading, Img } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { getCompanies } from '@/lib/api';
import CompanyType from '@/types/company.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';

type Props = {
  companies: CompanyType[];
};
const Index = ({ companies }: Props) => {
  const { name, businessId, address, city, country, coverImage } = companies[0];
  const t = useTranslations('AboutUs');
  return (
    <Layout>
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn/about-us"
        imageUrl="https://edumate.vn/edumate.png"
      />
      <Flex
        direction={{ base: 'column', md: 'row-reverse' }}
        m="auto"
        w={{ base: '95%', lg: '960px' }}
        border={{ base: '1px solid #000', md: 'none' }}
        borderColor="gray.200"
      >
        <AspectRatio ratio={{ base: 4 / 3, md: 3 / 4 }} flex={{ base: '100%', md: '40%' }}>
          <Img src={coverImage.url} alt={name} />
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
            {t('title')}
          </Heading>
          <Box fontSize="16px" color="gray.600">
            <ul>
              <li>
                {t('companyName')}: {name}
              </li>
              <li>
                {t('businessId')}: {businessId}
              </li>
              <li>
                {t('address')}: {address}
              </li>
              <li>
                {t('city')}: {city}
              </li>
              <li>
                {t('country')}: {country}
              </li>
            </ul>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const companies = (await getCompanies(locale)) || ([] as CompanyType[]);
  return {
    props: {
      companies: companies.map((company: CompanyType) => {
        return {
          ...company,
          coverImage: {
            url: `${process.env.CMS_URL}${company?.coverImage?.url ?? ''}`,
          },
        };
      }),
    },
  };
};
