import { useEffect, useState } from 'react';
import { Box, Square, Text } from '@chakra-ui/react';

import { FormatImages, WindowSizeType } from '@/types/shared';
import PageCharacteristicType from '@/types/page-characteristic.type';
import { getFormatImages } from '@/lib/helper';
import useWindowSizeHook from '@/hooks/useWindowSize.hook';

const Characteristic = ({ title, link, desc, coverImage }: Partial<PageCharacteristicType>) => {
  const [formatImages, setFormatImages] = useState<FormatImages>();
  useEffect(() => {
    if (coverImage?.url) {
      setFormatImages(getFormatImages(coverImage.url));
    }
  }, [coverImage]);

  const windowSize: WindowSizeType = useWindowSizeHook();
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Square
        position="relative"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        boxShadow="xs"
        background="rgb(0 0 0 / 85%)"
        padding={2}
        my={{ base: 2, lg: 3 }}
        mx={{ base: 0, sm: 2 }}
        size={{
          base: windowSize.width * 0.92,
          sm: (windowSize.width * 0.9) / 2,
          lg: (windowSize.width * 0.9) / 4,
          xl: (windowSize.width * 0.8) / 4,
        }}
        color="yellow.400"
        _hover={{
          transition: 'all .25s ease-in-out',
          boxShadow: 'dark-lg',
          background: 'black',
        }}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          backgroundImage={formatImages?.url}
          backgroundSize="cover"
          opacity={0.2}
        />
        <Box position="relative">
          <Text fontSize="1.25rem" fontWeight={700}>
            {title}
          </Text>

          <Text fontSize="0.8rem" color="white">
            {desc}
          </Text>
        </Box>
      </Square>
    </a>
  );
};

export default Characteristic;
