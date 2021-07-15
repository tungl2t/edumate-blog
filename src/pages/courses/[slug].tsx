import { Box, Heading } from '@chakra-ui/react';

import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import { getCourseByURL } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import CourseType from '@/types/course.type';

type Props = {
  courseUrl: string;
  course: CourseType;
};

const Post = ({ course, courseUrl }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={course.title}
        description={course.excerpt}
        url={courseUrl}
        imageUrl={course.coverImage.url}
      />
      <Box
        maxW="1216px"
        w="95%"
        m="4.5em auto"
        p={{ base: '1em', md: '3em 5em' }}
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading
          fontSize={{ base: '1.25em', sm: '1.5em', md: '1.75em' }}
          color="blue.800"
          mb="1em"
          textAlign="center"
        >
          {course?.title}
        </Heading>
        <Box
          className="content"
          textAlign={{ base: 'start', sm: 'justify' }}
          fontSize={{ base: '1em', md: '1.125em' }}
          dangerouslySetInnerHTML={{ __html: course.content }}
        />
      </Box>
    </Layout>
  );
};

export default Post;

type Params = {
  locale: string;
  params: {
    slug: string;
  };
};

export const getServerSideProps = async ({ params, locale }: Params) => {
  const data = await getCourseByURL(params.slug, locale);
  const course = data.courses[0];
  const content = await markdownToHtml(course?.content ?? '');
  return {
    props: {
      courseUrl: `${process.env.BLOG_URL}/${params.slug}`,
      course: {
        ...course,
        coverImage: { url: `${process.env.CMS_URL}${course?.coverImage.url ?? ''}` },
        content,
      },
    },
  };
};
