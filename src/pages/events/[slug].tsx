import { GetStaticPropsContext } from 'next';

import { getFormatImages } from '@/lib/helper';
import { getEventByPath } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import EventType from '@/types/event.type';
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
        imageUrl={event.coverImage.small}
      />
      <WrapperArticle title={event.title} htmlContent={event.content} />
    </Layout>
  );
};

export default Event;

export const getServerSideProps = async ({ params, locale }: GetStaticPropsContext) => {
  const path = params?.slug as string;
  const data = await getEventByPath(path, locale);
  const event = data.events[0] as EventType;
  const content = await markdownToHtml(event?.content ?? '');
  return {
    props: {
      eventUrl: `${process.env.NEXT_PUBLIC_EDUMATE_URL}/${path}`,
      event: {
        ...event,
        coverImage: getFormatImages(event?.coverImage?.url),
        content,
      },
    },
  };
};
