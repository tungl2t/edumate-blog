import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

import { getCourseByPath } from '@/lib/api';
import { getFormatImages } from '@/lib/helper';
import markdownToHtml from '@/lib/markdownToHtml';
import CourseType from '@/types/course.type';
import TestimonialType from '@/types/testimonial.type';
import TrainerType from '@/types/trainer.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import WrapperArticle from '@/components/wrapper-article';
import HeadingArticle from '@/components/heading-article';
import Testimonial from './components/testimonial';
import Trainer from './components/trainer';

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
        imageUrl={course.coverImage.small}
      />
      <WrapperArticle title={course.title} htmlContent={course.content}>
        {course.testimonials.length > 0 && <HeadingArticle heading={t('testimonials')} />}
        {course.testimonials.map((testimonial: TestimonialType, index: number) => (
          <Testimonial testimonial={testimonial} key={index} />
        ))}
        {course.trainers.length > 0 && <HeadingArticle heading={t('trainers')} />}
        {course.trainers.map((trainer: TrainerType, index: number) => (
          <Trainer trainer={trainer} key={index} />
        ))}
      </WrapperArticle>
    </Layout>
  );
};

export default Course;

export const getServerSideProps = async ({ params, locale }: GetStaticPropsContext) => {
  const path = params?.slug as string;
  const data = await getCourseByPath(path, locale);
  const course = data.courses[0] as CourseType;
  const content = await markdownToHtml(course?.content ?? '');
  return {
    props: {
      courseUrl: `${process.env.NEXT_PUBLIC_EDUMATE_URL}/${path}`,
      course: {
        ...course,
        coverImage: getFormatImages(course?.coverImage.url),
        content,
        testimonials: await Promise.all(
          (course?.testimonials ?? []).map(async (testimonial: TestimonialType) => {
            const content = await markdownToHtml(testimonial?.content ?? '');
            return {
              ...testimonial,
              content,
              picture: getFormatImages(testimonial.picture.url),
            };
          }),
        ),
        trainers: await Promise.all(
          (course?.trainers ?? []).map(async (trainer: TrainerType) => {
            const content = await markdownToHtml(trainer?.content ?? '');
            return {
              ...trainer,
              content,
              picture: getFormatImages(trainer.picture.url),
            };
          }),
        ),
      },
    },
  };
};
