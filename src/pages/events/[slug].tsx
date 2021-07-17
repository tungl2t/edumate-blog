import { Box, Heading } from '@chakra-ui/react';

import EventType from '@/types/event.type';
import { getEventByURL } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import WrapperArticle from '@/components/wrapper-article';

type Props = {
  eventUrl: string;
  event: EventType;
};
const Event = ({ event, eventUrl }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={event.title}
        description={event.title}
        url={eventUrl}
        imageUrl={event.coverImage.url}
      />
      <WrapperArticle title={event.title} htmlContent={event.content} />
    </Layout>
  );
};

export default Event;

type Params = {
  locale: string;
  params: {
    slug: string;
  };
};

export const getServerSideProps = async ({ params, locale }: Params) => {
  const data = await getEventByURL(params.slug, locale);
  const event = data.events[0] as EventType;
  const content = await markdownToHtml(event?.content ?? '');
  return {
    props: {
      eventUrl: `${process.env.EDUMATE_URL}/${params.slug}`,
      event: {
        ...event,
        coverImage: { url: `${process.env.CMS_URL}${event?.coverImage.url ?? ''}` },
        content,
      },
    },
  };
};
