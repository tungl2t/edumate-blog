import { useTranslations } from 'next-intl';
import { Box, Flex, Heading, Img } from '@chakra-ui/react';
import { AtSignIcon, CalendarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { format, parseISO } from 'date-fns';

import EventType from '@/types/event.type';
import { EdumateLink } from '@/components/edumate-link';
import Timer from './timer';

type Props = {
  event: EventType;
};

const EventPreview = ({ event }: Props) => {
  const { url, coverImage, title, startDate, location, detail, detailLink } = event;
  const t = useTranslations('Events');
  const date = parseISO(startDate);
  const href = detail ? `/events/${url}` : '';
  return (
    <EdumateLink href={href}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        _hover={{
          boxShadow: '0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f',
        }}
        cursor={detail ? 'pointer' : ''}
        border="1px solid"
        borderColor="gray.200"
        mt="15px"
        w={{ base: '95%', lg: '960px' }}
      >
        <Img
          src={coverImage.url}
          w={{ base: '100%', md: '40%' }}
          objectFit="cover"
          alt={title}
          style={{
            aspectRatio: '4/3',
          }}
        />
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={{ base: '1.25em', sm: '1.5em' }}
        >
          <Heading fontSize={{ base: '1.25em' }} color="blue.800">
            {title}
          </Heading>
          <Timer day={startDate} />
          <Box
            fontSize={{ base: '0.95em', sm: '1em' }}
            color="gray.600"
            display="flex"
            alignItems="center"
            my="0.25em"
          >
            <CalendarIcon mr="0.5em" color="blue.800" />
            <time dateTime={startDate}>{format(date, 'dd/MM/yyyy - hh:mm a')}</time>
          </Box>
          <Box
            fontSize={{ base: '0.95em', sm: '1em' }}
            color="gray.600"
            display="flex"
            alignItems="center"
            my="0.25em"
          >
            <AtSignIcon mr="0.5em" color="blue.800" />
            {location}
          </Box>
          {detailLink ? (
            <Box
              fontSize={{ base: '0.95em', sm: '1em' }}
              color="gray.600"
              display="flex"
              alignItems="center"
              my="0.25em"
            >
              <ExternalLinkIcon mr="0.5em" color="blue.800" />
              <a href={detailLink} target="_blank">
                {t('detail')}
              </a>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Flex>
    </EdumateLink>
  );
};

export default EventPreview;
