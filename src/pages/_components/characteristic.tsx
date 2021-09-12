import { useEffect, useState } from 'react';
import { Box, Square, Text } from '@chakra-ui/react';

import { FormatImages } from '@/types/shared';
import PageCharacteristicType from '@/types/page-characteristic.type';
import { getFormatImages } from '@/lib/helper';

const Characteristic = ({ title, link, desc, coverImage }: Partial<PageCharacteristicType>) => {
  const [formatImages, setFormatImages] = useState<FormatImages>();
  useEffect(() => {
    if (coverImage?.url) {
      setFormatImages(getFormatImages(coverImage.url));
    }
  }, [coverImage]);
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
        mt="1.5em"
        mx="3"
        size={320}
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
