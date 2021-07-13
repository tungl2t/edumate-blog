import { AppContext } from 'next/app';
import { Flex } from '@chakra-ui/react';

import Layout from '@/components/layout';
import ServicePreview from './components/service-preview';
import { getServices } from '@/lib/api';
import ServiceType from '@/types/service';

type Props = {
  services: ServiceType[];
};

const Index = ({ services }: Props) => {
  console.log(services);
  return (
    <Layout>
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
      services: services.map((service: ServiceType) => {
        return {
          ...service,
          coverImage: {
            url: `${process.env.CMS_URL}${service?.coverImage?.url ?? ''}`,
          },
        };
      }),
    },
  };
};
