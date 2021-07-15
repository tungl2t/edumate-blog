import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';
import HomeType from '@/types/home.type';

type Props = {
  home: HomeType;
  index: number;
  children?: ReactNode;
};

const HomePreview = ({ home, index, children }: Props) => {
  return (
    <Flex
      direction={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
      my={{ base: '1em', md: '1.5em' }}
      width={{ base: '95%', xl: '1216px' }}
    >
      <Image
        src={home.coverImage.url}
        maxW={{ base: '100%', md: '50%' }}
        objectFit="contain"
        alt={home.title}
        style={{
          aspectRatio: '4/3',
        }}
      />
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        m={{ base: 'unset', md: 'auto' }}
      >
        <Heading
          as="h3"
          size="md"
          mb="5px"
          mt={{ base: '1em', '2md': '0' }}
          color="blue.800"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            maxWidth: '100%',
          }}
          padding="0 15px"
        >
          {home.title}
        </Heading>
        <Box
          fontSize="16px"
          color="gray.600"
          mb="15px"
          padding="0 15px"
          dangerouslySetInnerHTML={{ __html: home.content }}
        />
        {children}
      </Box>
    </Flex>
  );
};

export default HomePreview;
