import { GetStaticPropsContext } from 'next';
import { Flex } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { getEvents, getPageByPath } from '@/lib/api';
import EventType from '@/types/event.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import EventPreview from './components/event-preview';
import PageType from '@/types/page.type';

type Props = {
  events: EventType[];
  page: PageType;
};

const Index = ({ events, page }: Props) => {
  const t = useTranslations('Events');
  return (
    <Layout>
      {' '}
      <MyMeta
        title={page.name}
        description={page.description}
        url="/events"
        imageUrl={page.coverImage.url}
      />
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {events.map((event, index) => (
          <EventPreview event={event} key={event.slug} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const events = (await getEvents(locale)) || [];
  const data = await getPageByPath('/events', locale);
  return {
    props: {
      events: events.map((event: EventType) => {
        return {
          ...event,
          coverImage: {
            url: `${process.env.NEXT_PUBLIC_CMS_URL}${event?.coverImage?.url ?? ''}`,
          },
        };
      }),
      page: {
        ...data.pages[0],
        coverImage: {
          url: `${process.env.NEXT_PUBLIC_CMS_URL}${data.pages[0]?.coverImage?.url ?? ''}`,
        },
      },
    },
  };
};
