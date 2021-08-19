import { useTranslations } from 'next-intl';
import { Box } from '@chakra-ui/react';
import { AtSignIcon, CalendarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { format, parseISO } from 'date-fns';

import EventType from '@/types/event.type';
import Preview from '@/components/preview';
import Timer from './timer';

type Props = {
  event: EventType;
};

const EventPreview = ({ event }: Props) => {
  const { eventPath, coverImage, title, startDate, location, detailLink } = event;
  const t = useTranslations('Events');
  const date = parseISO(startDate);
  const path = eventPath ? `/events/${eventPath}` : '';
  return (
    <Preview title={title} path={path} imageUrl={coverImage.url}>
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
      {detailLink && (
        <Box
          fontSize={{ base: '0.95em', sm: '1em' }}
          color="gray.600"
          display="flex"
          alignItems="center"
          my="0.25em"
        >
          <ExternalLinkIcon mr="0.5em" color="blue.800" />
          <a href={detailLink} target="_blank" rel="noreferrer">
            {t('detail')}
          </a>
        </Box>
      )}
    </Preview>
  );
};

export default EventPreview;
