import { Text } from '@chakra-ui/react';

import CourseType from '@/types/course.type';
import Preview from '@/components/preview';

type Props = {
  course: CourseType;
};

const CoursePreview = ({ course }: Props) => {
  const { coursePath, coverImage, title, excerpt } = course;
  const path = coursePath ? `/courses/${coursePath}` : '';
  return (
    <Preview title={title} path={path} formatImages={coverImage}>
      <Text fontSize={{ base: '0.95em', sm: '1em' }} color="gray.600">
        {excerpt}
      </Text>
    </Preview>
  );
};

export default CoursePreview;
