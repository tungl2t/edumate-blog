import ServiceType from '@/types/service';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

type Props = {
  service: ServiceType;
};

const ServicePreview = ({ service }: Props) => {
  const { coverImage, title, content } = service;
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      _hover={{
        boxShadow: '0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f',
      }}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.200"
      mt="15px"
      width={{ base: '90%', lg: '1000px' }}
    >
      <Image
        src={coverImage.url}
        maxW={{ base: '100%', md: '400px' }}
        objectFit="cover"
        alt={title}
      />
      <Box position="relative" display="flex" flexDirection="column" justifyContent="center">
        <Heading
          as="h3"
          size="md"
          mb="5px"
          mt={{ base: '2em', sm: '0' }}
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
          {title}
        </Heading>
        <Text
          fontSize="14px"
          color="gray.500"
          display="inline-block"
          mb="15px"
          padding="0 15px"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {content}
        </Text>
      </Box>
    </Flex>
  );
};

export default ServicePreview;
