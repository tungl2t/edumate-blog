import { useEffect, useState } from 'react';
import {
  HOURS_IN_A_DAY,
  MILLISECONDS_IN_A_SECOND,
  MINUTES_IN_AN_HOUR,
  SECONDS_IN_A_MINUTE,
} from '@/lib/constants';
import { Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

type Props = {
  day: string;
};

const Timer = ({ day }: Props) => {
  const t = useTranslations('Timer');
  const [secondsToDay, setSecondsToDay] = useState(0);
  const [minutesToDay, setMinutesToDay] = useState(0);
  const [hoursToDay, setHoursToDay] = useState(0);
  const [daysToDay, setDaysToDay] = useState(0);
  const dayTime = new Date(day).getTime();
  useEffect(() => {
    let interval = setInterval(() => {
      const timeDifference = dayTime - new Date().getTime();
      setSecondsToDay(
        Math.floor((timeDifference / MILLISECONDS_IN_A_SECOND) % SECONDS_IN_A_MINUTE),
      );
      setMinutesToDay(
        Math.floor(
          (timeDifference / (MILLISECONDS_IN_A_SECOND * MINUTES_IN_AN_HOUR)) % SECONDS_IN_A_MINUTE,
        ),
      );
      setHoursToDay(
        Math.floor(
          (timeDifference / (MILLISECONDS_IN_A_SECOND * MINUTES_IN_AN_HOUR * SECONDS_IN_A_MINUTE)) %
            HOURS_IN_A_DAY,
        ),
      );
      setDaysToDay(
        Math.floor(
          timeDifference /
            (MILLISECONDS_IN_A_SECOND * MINUTES_IN_AN_HOUR * SECONDS_IN_A_MINUTE * HOURS_IN_A_DAY),
        ),
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  return secondsToDay > -1 ? (
    <Box fontSize={{ base: '1em', sm: '1.25em' }} color="gray.600" my="0.5em">
      <span>
        {daysToDay} {t('d')}
      </span>
      <span>
        {' '}
        {hoursToDay} {t('h')}{' '}
      </span>
      <span>
        {' '}
        {minutesToDay} {t('m')}
      </span>
      <span>
        {' '}
        {secondsToDay} {t('s')}
      </span>
    </Box>
  ) : null;
};

export default Timer;
