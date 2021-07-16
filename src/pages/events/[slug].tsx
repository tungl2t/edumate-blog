import { Box, Heading } from '@chakra-ui/react';

import EventType from '@/types/event.type';
import { getEventByURL } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';

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
      <article>
        <Box
          w={{ base: '90%', sm: '95%', lg: '960px' }}
          m="4.5em auto"
          p={{ base: '1em', sm: '5em' }}
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading
            fontSize="1.75em"
            color="blue.800"
            mb="1em"
            textAlign="center"
            textTransform="uppercase"
          >
            {event.title}
          </Heading>
          <Box
            className="content"
            textAlign={{ base: 'start', sm: 'justify' }}
            fontSize={{ base: '1em', sm: '1.125em' }}
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        </Box>
      </article>
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
