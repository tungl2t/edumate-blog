import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import CourseType from '@/types/course.type';
import { EdumateLink } from '@/components/edumate-link';

type Props = {
  course: CourseType;
};

const CoursePreview = ({ course }: Props) => {
  const { url, coverImage, title, excerpt, detail } = course;
  const href = detail ? `/courses/${url}` : '';
  return (
    <EdumateLink href={href}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        _hover={{
          boxShadow: '0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f',
        }}
        cursor={detail ? 'pointer' : ''}
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
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          py="1.25em"
        >
          <Heading size="md" mb="5px" color="blue.800" padding="0 15px">
            {title}
          </Heading>
          <Text fontSize="16px" color="gray.600" display="inline-block" mb="15px" padding="0 15px">
            {excerpt}
          </Text>
        </Box>
      </Flex>
    </EdumateLink>
  );
};

export default CoursePreview;
