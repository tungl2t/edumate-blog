import EventType from '@/types/event.type';
import { getEventByPath } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import WrapperArticle from '@/components/wrapper-article';
import { GetStaticPropsContext } from 'next';

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
        coverImage: { url: `${process.env.NEXT_PUBLIC_CMS_URL}${event?.coverImage.url ?? ''}` },
        content,
      },
    },
  };
};
