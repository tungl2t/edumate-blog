import { Box, Flex, Heading, Img } from '@chakra-ui/react';
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
      w={{ base: '95%', lg: '960px' }}
      border={{ base: '1px solid #000', md: 'none' }}
      borderColor="gray.200"
    >
      <Img
        src={home.coverImage.url}
        w={{ base: '100%', md: '50%' }}
        flex={{ base: '100%', md: '50%' }}
        objectFit={{ base: 'cover', md: 'contain' }}
        alt={home.title}
        style={{
          aspectRatio: '4/3',
        }}
      />
      <Box
        position="relative"
        display="flex"
        flex={{ base: '100%', md: '50%' }}
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
