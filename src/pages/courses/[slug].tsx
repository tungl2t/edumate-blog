import { Box, Heading } from '@chakra-ui/react';

import { getCourseByURL } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import CourseType from '@/types/course.type';
import TestimonialType from '@/types/testimonial.type';
import TrainerType from '@/types/trainer.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import { Testimonial } from './components/testimonial';
import { useTranslations } from 'next-intl';
import { Trainer } from './components/trainer';

type Props = {
  courseUrl: string;
  course: CourseType;
};

const Course = ({ course, courseUrl }: Props) => {
  const t = useTranslations('Courses');
  return (
    <Layout>
      <MyMeta
        title={course.title}
        description={course.excerpt}
        url={courseUrl}
        imageUrl={course.coverImage.url}
      />
      <Box
        w={{ base: '90%', sm: '95%', lg: '960px' }}
        m="4.5em auto"
        p={{ base: '1em', sm: '5em' }}
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading
          fontSize="1.75em"
          color="blue.800"
          mb="1em"
          textAlign="center"
          textTransform="uppercase"
        >
          {course?.title}
        </Heading>
        <Box
          className="content"
          textAlign={{ base: 'start', sm: 'justify' }}
          fontSize={{ base: '1em', sm: '1.125em' }}
          dangerouslySetInnerHTML={{ __html: course.content }}
        />
        <Heading
          fontSize="1.75em"
          color="blue.800"
          textAlign="center"
          textTransform="uppercase"
          my="1.5em"
        >
          {t('testimonials')}
        </Heading>
        {course.testimonials.map((testimonial: TestimonialType, index: number) => (
          <Testimonial testimonial={testimonial} key={index} />
        ))}

        <Heading
          fontSize="1.75em"
          color="blue.800"
          textAlign="center"
          textTransform="uppercase"
          my="1.5em"
        >
          {t('trainers')}
        </Heading>
        {course.trainers.map((trainer: TrainerType, index: number) => (
          <Trainer trainer={trainer} key={index} />
        ))}
      </Box>
    </Layout>
  );
};

export default Course;

type Params = {
  locale: string;
  params: {
    slug: string;
  };
};

export const getServerSideProps = async ({ params, locale }: Params) => {
  const data = await getCourseByURL(params.slug, locale);
  const course = data.courses[0] as CourseType;
  const content = await markdownToHtml(course?.content ?? '');
  return {
    props: {
      courseUrl: `${process.env.BLOG_URL}/${params.slug}`,
      course: {
        ...course,
        coverImage: { url: `${process.env.CMS_URL}${course?.coverImage.url ?? ''}` },
        content,
        testimonials: await Promise.all(
          (course?.testimonials ?? []).map(async (testimonial: TestimonialType) => {
            const content = await markdownToHtml(testimonial?.content ?? '');
            return {
              ...testimonial,
              content,
              picture: {
                url: `${process.env.CMS_URL}${testimonial.picture.url}`,
              },
            };
          }),
        ),
        trainers: await Promise.all(
          (course?.trainers ?? []).map(async (trainer: TrainerType) => {
            const content = await markdownToHtml(trainer?.content ?? '');
            return {
              ...trainer,
              content,
              picture: {
                url: `${process.env.CMS_URL}${trainer.picture.url}`,
              },
            };
          }),
        ),
      },
    },
  };
};
