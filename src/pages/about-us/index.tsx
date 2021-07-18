import Layout from '@/components/layout';
import { getCompanies } from '@/lib/api';
import CompanyType from '@/types/company.type';
import { useTranslations } from 'next-intl';
import MyMeta from '@/components/my-meta';
import { Box, Flex, Heading, Img } from '@chakra-ui/react';
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
        imageUrl="/edumate.png"
      />
      <Flex
        direction={{ base: 'column', md: 'row-reverse' }}
        m={{ base: '5px auto', sm: 'auto' }}
        w={{ base: '95%', lg: '960px' }}
        border={{ base: '1px solid #000', md: 'none' }}
        borderColor="gray.200"
      >
        <Img
          src={coverImage.url}
          w={{ base: '100%', md: '50%' }}
          flex={{ base: '100%', md: '50%' }}
          objectFit={{ base: 'cover', md: 'contain' }}
          alt={name}
          style={{
            aspectRatio: '3/4',
          }}
        />
        <Box
          position="relative"
          display="flex"
          flex={{ base: '100%', md: '50%' }}
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
