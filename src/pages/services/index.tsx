import { useTranslations } from 'next-intl';
import { Flex } from '@chakra-ui/react';

import ServiceType from '@/types/service.type';
import { getServices } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import ServicePreview from './components/service-preview';

type Props = {
  services: ServiceType[];
};

const Index = ({ services }: Props) => {
  const t = useTranslations('Service');
  return (
    <Layout>
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn/services"
        imageUrl="https://edumate.vn/edumate.png"
      />
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {services.map((service) => (
          <ServicePreview service={service} key={service.slug} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const services = (await getServices(locale)) || [];
  return {
    props: {
      services: await Promise.all(
        services.map(async (service: ServiceType) => {
          const content = await markdownToHtml(service.content);
          return {
            ...service,
            content,
            coverImage: {
              url: `${process.env.CMS_URL}${service?.coverImage?.url ?? ''}`,
            },
          };
        }),
      ),
    },
  };
};
