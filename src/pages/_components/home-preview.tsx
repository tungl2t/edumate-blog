import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';
import HomeType from '@/types/home';

type Props = {
  home: HomeType;
  children?: ReactNode;
};

const HomePreview = ({ home, children }: Props) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      _hover={{
        boxShadow: '0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f',
      }}
      mt="1em"
      border="1px solid"
      borderColor="gray.200"
      width={{ base: '90%', lg: '1000px' }}
    >
      <Image
        src={home.coverImage.url}
        maxW={{ base: '100%', md: '40%' }}
        objectFit="cover"
        alt={home.title}
        style={{
          aspectRatio: '4/3',
        }}
      />
      <Box position="relative" display="flex" flexDirection="column" justifyContent="center">
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
