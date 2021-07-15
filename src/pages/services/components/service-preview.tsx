import ServiceType from '@/types/service.type';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';

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
      border="1px solid"
      borderColor="gray.200"
      mt="15px"
      width={{ base: '95%', xl: '1216px' }}
    >
      <Image
        src={coverImage.url}
        maxW={{ base: '100%', md: '40%' }}
        objectFit="cover"
        alt={title}
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
          {title}
        </Heading>
        <Box
          fontSize="16px"
          color="gray.600"
          mb="15px"
          padding="0 15px"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Box>
    </Flex>
  );
};

export default ServicePreview;
