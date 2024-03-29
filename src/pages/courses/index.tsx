import { GetStaticPropsContext } from 'next';
import { Flex } from '@chakra-ui/react';

import { getCourses, getPageByPath } from '@/lib/api';
import { getFormatImages } from '@/lib/helper';
import CourseType from '@/types/course.type';
import PageType from '@/types/page.type';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import CoursePreview from './components/course-preview';

type Props = {
  courses: CourseType[];
  page: PageType;
};

const Index = ({ courses, page }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/courses"
        imageUrl={page.coverImage.small}
      />
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {courses.map((course, index) => (
          <CoursePreview course={course} key={course.slug} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const courses = (await getCourses(locale)) || [];
  const data = await getPageByPath('/courses', locale);
  return {
    props: {
      courses: courses.map((course: CourseType) => {
        return {
          ...course,
          coverImage: getFormatImages(course?.coverImage?.url),
        };
      }),
      page: {
        ...data.pages[0],
        coverImage: getFormatImages(data.pages[0]?.coverImage?.url),
      },
    },
  };
};
