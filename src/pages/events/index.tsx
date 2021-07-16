import { Flex } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import EventType from '@/types/event.type';
import { getEvents } from '@/lib/api';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import EventPreview from './components/event-preview';

type Props = {
  events: EventType[];
};

const Index = ({ events }: Props) => {
  const t = useTranslations('Events');
  return (
    <Layout>
      {' '}
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn/events"
        imageUrl="/edumate.png"
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

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const events = (await getEvents(locale)) || [];
  return {
    props: {
      events: events.map((event: EventType) => {
        return {
          ...event,
          coverImage: {
            url: `${process.env.CMS_URL}${event?.coverImage?.url ?? ''}`,
          },
        };
      }),
    },
  };
};
