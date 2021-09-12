import { AspectRatio, Box, Flex, Heading, Img } from '@chakra-ui/react';
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
      mb={2}
      w={{ base: '95%', lg: '960px' }}
      border={{ base: '1px solid #000', md: 'none' }}
      borderColor="gray.200"
    >
      <AspectRatio ratio={{ base: 4 / 3, md: 3 / 4 }} flex={{ base: '100%', md: '30%' }}>
        <Img src={home.coverImage.url} alt={home.title} />
      </AspectRatio>
      <Box
        position="relative"
        display="flex"
        flex={{ base: '100%', md: '70%' }}
        flexDirection="column"
        justifyContent="center"
        alignItems={{ base: 'start', md: 'center' }}
        p={{ base: '1.25em', sm: '1.5em' }}
      >
        <div>
          <Heading size="md" color="blue.800">
            {home.title}
          </Heading>
          <Box
            fontSize="16px"
            color="gray.600"
            dangerouslySetInnerHTML={{ __html: home.content }}
          />
          {children}
        </div>
      </Box>
    </Flex>
  );
};

export default HomePreview;
