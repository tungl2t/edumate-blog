import { useTranslations } from 'next-intl';

import { getCourseByPath } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import CourseType from '@/types/course.type';
import TestimonialType from '@/types/testimonial.type';
import TrainerType from '@/types/trainer.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import Testimonial from './components/testimonial';
import Trainer from './components/trainer';
import WrapperArticle from '@/components/wrapper-article';
import HeadingArticle from '@/components/heading-article';

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
      <WrapperArticle title={course.title} htmlContent={course.content}>
        <HeadingArticle heading={t('testimonials')} />
        {course.testimonials.map((testimonial: TestimonialType, index: number) => (
          <Testimonial testimonial={testimonial} key={index} />
        ))}
        <HeadingArticle heading={t('trainers')} />
        {course.trainers.map((trainer: TrainerType, index: number) => (
          <Trainer trainer={trainer} key={index} />
        ))}
      </WrapperArticle>
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
  const data = await getCourseByPath(params.slug, locale);
  const course = data.courses[0] as CourseType;
  const content = await markdownToHtml(course?.content ?? '');
  return {
    props: {
      courseUrl: `${process.env.EDUMATE_URL}/${params.slug}`,
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
