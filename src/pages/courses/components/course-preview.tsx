import { Icon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Img } from '@chakra-ui/react';
import { BsBoxArrowInRight } from 'react-icons/bs';

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
        my="1em"
        w={{ base: '95%', lg: '960px' }}
      >
        <Img
          src={coverImage.url}
          w={{ base: '100%', md: '40%' }}
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
          p={{ base: '1.25em', sm: '1.5em' }}
        >
          <Flex direction="row" justifyContent="start" alignItems="center" mb="5px">
            <Heading size="md" color="blue.800">
              {title}
            </Heading>
            {detail ? (
              <Box
                fontSize={{ base: '0.95em', sm: '1em' }}
                color="gray.600"
                display="flex"
                alignItems="center"
                ml="0.5em"
              >
                <Icon as={BsBoxArrowInRight} color="blue.800" />
              </Box>
            ) : (
              ''
            )}
          </Flex>
          <Box fontSize={{ base: '0.95em', sm: '1em' }} color="gray.600">
            {excerpt}
          </Box>

        </Box>
      </Flex>
    </EdumateLink>
  );
};

export default CoursePreview;
