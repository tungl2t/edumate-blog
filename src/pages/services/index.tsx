import { GetStaticPropsContext } from 'next';
import { Flex } from '@chakra-ui/react';

import { getPageByPath, getServices } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { getFormatImages } from '@/lib/helper';
import ServiceType from '@/types/service.type';
import PageType from '@/types/page.type';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import ServicePreview from './components/service-preview';

type Props = {
  services: ServiceType[];
  page: PageType;
};

const Index = ({ services, page }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/services"
        imageUrl={page.coverImage.small}
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

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const services = (await getServices(locale)) || [];
  const data = await getPageByPath('/services', locale);
  return {
    props: {
      services: await Promise.all(
        services.map(async (service: ServiceType) => {
          const content = await markdownToHtml(service.content);
          return {
            ...service,
            content,
            coverImage: getFormatImages(service?.coverImage?.url),
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
