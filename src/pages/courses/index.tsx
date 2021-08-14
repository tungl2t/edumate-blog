import { useTranslations } from 'next-intl';
import { Flex } from '@chakra-ui/react';

import { getCourses } from '@/lib/api';
import CourseType from '@/types/course.type';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import CoursePreview from './components/course-preview';

type Props = {
  courses: CourseType[];
};

const Index = ({ courses }: Props) => {
  const t = useTranslations('Courses');
  return (
    <Layout>
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn/courses"
        imageUrl="https://edumate.vn/edumate.png"
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

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const courses = (await getCourses(locale)) || [];
  return {
    props: {
      courses: courses.map((course: CourseType) => {
        return {
          ...course,
          coverImage: {
            url: `${process.env.CMS_URL}${course?.coverImage?.url ?? ''}`,
          },
        };
      }),
    },
  };
};
